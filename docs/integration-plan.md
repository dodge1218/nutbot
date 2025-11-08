# Wearable & Biometric Integration Plan

**Version:** 1.0  
**Target Release:** v2.0 (Q2-Q3 2025)  
**Document Owner:** Product & Engineering Teams

---

## 1. Executive Summary

This document outlines NutBot's roadmap for integrating with wearable devices and biometric data sources to provide personalized, activity-aware nutrition recommendations.

**Goals:**
- Automatically adjust calorie and nutrient targets based on activity level
- Optimize meal timing around workouts and sleep
- Correlate nutrition with energy levels, recovery, and performance
- Reduce manual data entry for active users

**Platforms (Priority Order):**
1. Apple Health (iOS) — Highest priority, largest user base
2. Fitbit — Second priority, complementary to Apple
3. Google Fit (Android) — Third priority, Android coverage
4. (Future) Oura Ring, Whoop, Garmin

---

## 2. Data Points to Integrate

### 2.1 Activity & Exercise

**From Wearables:**
- Step count (daily)
- Active minutes (light, moderate, vigorous)
- Workouts (type, duration, intensity, calories burned)
- Heart rate (resting, average, max during exercise)

**Use Cases:**
- Adjust calorie targets dynamically (e.g., +500 kcal on heavy workout days)
- Increase protein recommendation post-workout
- Suggest electrolytes for long cardio sessions
- Recommend magnesium on high-stress/high-activity days

---

### 2.2 Sleep

**From Wearables:**
- Total sleep duration
- Sleep quality score (if available)
- Bedtime and wake time

**Use Cases:**
- Poor sleep → suggest magnesium before bed
- Late bedtime → recommend avoiding caffeine after 2pm
- Insufficient sleep → highlight nutrients for energy and recovery (B vitamins, iron, vitamin D)

---

### 2.3 Heart Rate Variability (HRV)

**From Wearables:**
- HRV trends (stress/recovery indicator)

**Use Cases:**
- Low HRV (high stress) → recommend magnesium, omega-3, stress-support foods
- Pair with gut health score to identify stress-gut axis issues

---

### 2.4 Weight & Body Composition (Optional)

**From Smart Scales:**
- Weight trends
- Body fat percentage (if supported)

**Use Cases:**
- Adjust macro targets (e.g., higher protein if losing weight)
- Correlate nutrient intake with weight trends

---

### 2.5 Cycle Tracking (Future — iOS 16+)

**From Apple Health:**
- Menstrual cycle phase

**Use Cases:**
- Increase iron during menstruation
- Adjust magnesium for PMS symptoms
- Tailor recommendations by cycle phase

---

## 3. Platform-Specific Integration Details

### 3.1 Apple Health (HealthKit)

**Priority:** P0 (Critical for v2.0)

**Technical Requirements:**
- HealthKit API integration (iOS only)
- User permission flow (explicit consent)
- Background sync (when app is closed)

**Data to Read:**
- `HKQuantityTypeIdentifierStepCount`
- `HKQuantityTypeIdentifierActiveEnergyBurned`
- `HKCategoryTypeIdentifierSleepAnalysis`
- `HKQuantityTypeIdentifierHeartRate`
- `HKQuantityTypeIdentifierBodyMass` (optional)
- `HKWorkoutType` (workouts)

**Implementation:**
- Native iOS module (React Native bridge or Swift)
- Store sync status in user settings
- Respect user privacy: data stays on device, only aggregates sent to server

**Challenges:**
- App Review requirements (justify each HealthKit permission)
- Battery usage (limit background syncs)
- Permissions can be revoked anytime by user

**Timeline:**
- Research & design: 2 weeks
- Implementation: 4-6 weeks
- Testing: 2 weeks
- App Review: 1-2 weeks

---

### 3.2 Fitbit

**Priority:** P1 (High priority for v2.0)

**Technical Requirements:**
- Fitbit Web API (OAuth 2.0)
- User auth flow (redirect to Fitbit login)
- Token management (access + refresh tokens)
- Webhook subscriptions (for real-time updates)

**Data to Read:**
- Activity (steps, distance, calories, active minutes)
- Heart rate (resting, intraday)
- Sleep (stages, duration, efficiency)
- Workouts

**API Endpoints:**
- `GET /1/user/-/activities/date/{date}.json`
- `GET /1.2/user/-/sleep/date/{date}.json`
- `GET /1/user/-/activities/heart/date/{date}/1d.json`

**Challenges:**
- Rate limits (150 requests/hour per user)
- Token expiration (must handle refresh)
- Requires Fitbit developer app registration

**Timeline:**
- OAuth setup: 1 week
- API integration: 3-4 weeks
- Testing: 2 weeks

---

### 3.3 Google Fit

**Priority:** P2 (Medium priority for Android coverage)

**Technical Requirements:**
- Google Fit REST API
- OAuth 2.0 (Google Sign-In)
- Scopes: `FITNESS_ACTIVITY_READ`, `FITNESS_SLEEP_READ`, `FITNESS_HEART_RATE_READ`

**Data to Read:**
- Steps, distance, calories
- Heart rate
- Sleep sessions
- Workouts

**Challenges:**
- Less data granularity than Apple Health/Fitbit
- Fragmented Android ecosystem (many devices)
- User adoption lower than Apple Health (among target market)

**Timeline:**
- OAuth setup: 1 week
- API integration: 3 weeks
- Testing: 2 weeks

---

### 3.4 Future Platforms

**Oura Ring:**
- Focus: Sleep, HRV, readiness
- Use case: Recovery-focused nutrition
- Timeline: v2.1+

**Whoop:**
- Focus: Strain, recovery, sleep
- Use case: Athletes, biohackers
- Timeline: v2.1+

**Garmin:**
- Focus: Endurance athletes
- API: Garmin Health API
- Timeline: v2.2+ (if demand exists)

---

## 4. User Experience (UX) Flow

### 4.1 Initial Connection

```
1. User goes to Settings → Wearable Integrations
2. Sees list of supported platforms (Apple Health, Fitbit, Google Fit)
3. Clicks "Connect [Platform]"
4. Redirected to platform's OAuth consent screen
5. User grants permissions
6. Redirected back to NutBot
7. Success message: "Connected! Syncing your data..."
8. Background sync begins
```

### 4.2 Daily Sync

```
1. User opens app in the morning
2. App fetches yesterday's activity/sleep data
3. Adjusts today's recommendations:
   - "You burned 600 extra calories yesterday — increase protein by 20g today"
   - "You slept only 5 hours — prioritize magnesium and B vitamins"
4. Dashboard shows activity-adjusted targets
```

### 4.3 Disconnect

```
1. User goes to Settings → Wearable Integrations
2. Clicks "Disconnect [Platform]"
3. Confirmation modal: "This will stop syncing data. Your historical data will be kept."
4. User confirms
5. OAuth token revoked (server-side)
6. Success message
```

---

## 5. Technical Architecture

### 5.1 Data Flow

```
[Wearable Device] 
    ↓ (syncs to platform)
[Apple Health / Fitbit / Google Fit]
    ↓ (API request)
[NutBot Backend API]
    ↓ (process & store)
[User Database: biometric_data table]
    ↓ (analyze)
[Nutrition Engine: adjust recommendations]
    ↓ (display)
[User Dashboard]
```

### 5.2 Database Schema (New Table)

```sql
CREATE TABLE biometric_data (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  source VARCHAR(50), -- 'apple_health', 'fitbit', 'google_fit'
  
  -- Activity
  steps INTEGER,
  active_minutes INTEGER,
  calories_burned INTEGER,
  workout_type VARCHAR(50),
  workout_duration INTEGER,
  
  -- Sleep
  sleep_duration INTEGER, -- minutes
  sleep_quality FLOAT, -- 0-100 score
  
  -- Heart
  resting_heart_rate INTEGER,
  avg_heart_rate INTEGER,
  hrv FLOAT,
  
  -- Meta
  synced_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_biometric_user_date ON biometric_data(user_id, date);
```

### 5.3 API Endpoints

**`POST /api/wearables/connect`**
- Initiates OAuth flow
- Returns auth URL for redirect

**`GET /api/wearables/callback`**
- Handles OAuth callback
- Exchanges code for token
- Stores tokens securely

**`POST /api/wearables/sync`**
- Triggers manual sync
- Fetches latest data from platform

**`DELETE /api/wearables/disconnect`**
- Revokes OAuth token
- Deletes stored tokens (but keeps historical data)

**`GET /api/wearables/status`**
- Returns connection status
- Last sync time
- Data availability

---

## 6. Privacy & Security

### 6.1 User Consent

- Explicit opt-in (not automatic)
- Explain what data we collect and why
- Users can revoke access anytime

### 6.2 Data Storage

- **OAuth tokens:** Encrypted in database (AES-256)
- **Biometric data:** Stored securely, not shared with third parties
- **Retention:** Keep 90 days of granular data, aggregates indefinitely (for trends)

### 6.3 Data Minimization

- Only request necessary scopes
- Don't sync every datapoint (e.g., skip GPS location, detailed heart rate zones)
- Aggregate data where possible (daily summaries, not minute-by-minute)

### 6.4 Compliance

- GDPR: Right to delete, data portability, consent management
- CCPA: Do not sell data, opt-out options
- HIPAA: Not applicable (we're wellness, not healthcare), but follow best practices

---

## 7. Business Impact

### 7.1 User Value

- **Personalization:** Recommendations match actual activity, not just estimates
- **Convenience:** No manual entry of exercise/sleep
- **Accuracy:** Calorie targets adjust dynamically
- **Insights:** "On days you sleep < 6 hours, your fiber intake drops 30%" (correlation insights)

### 7.2 Retention Impact

- Users with wearables integrated are 2-3x more likely to remain active (hypothesis)
- "Set it and forget it" — passive data collection reduces friction

### 7.3 Monetization

- Premium feature (wearable sync requires subscription)
- Upsell opportunity in onboarding

### 7.4 Competitive Differentiation

- Most nutrition apps don't adjust for activity in real-time
- Combines nutrition + fitness tracking in one place

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **API rate limits** | Medium | Cache data, batch requests, respect limits |
| **Platform API changes** | High | Monitor changelogs, have fallback UI |
| **User revokes permissions** | Low | Graceful degradation, notify user |
| **Battery drain** | Medium | Limit background syncs to 1x/day |
| **Privacy concerns** | Medium | Clear messaging, strong encryption, compliance |
| **Platform approval delays** (Apple) | Medium | Submit early, justify each permission |

---

## 9. Success Metrics

### Adoption
- % of users who connect wearables (target: 30% of premium users)
- Active integrations (not disconnected)

### Engagement
- % increase in app opens (expect +20% with wearables)
- Retention improvement (wearable vs. non-wearable users)

### Accuracy
- User feedback on adjusted recommendations
- Correlation between activity and nutrition changes

---

## 10. Roadmap

### Phase 1: Apple Health (Q2 2025)
- Weeks 1-2: Research, design, permissions
- Weeks 3-8: Implementation (read activity, sleep, heart rate)
- Weeks 9-10: Testing
- Week 11-12: App Review, launch

### Phase 2: Fitbit (Q3 2025)
- Weeks 1-2: OAuth setup
- Weeks 3-6: API integration
- Weeks 7-8: Testing, launch

### Phase 3: Google Fit (Q3 2025)
- Parallel to Fitbit (similar OAuth flow)
- Weeks 3-6: Integration
- Weeks 7-8: Testing, launch

### Phase 4: Enhancements (Q4 2025+)
- Correlation insights ("You eat 20% more protein on workout days")
- Predictive recommendations ("Tomorrow's a rest day — consider lighter meals")
- Cycle tracking (for female users)

---

## 11. Open Questions

1. **Should we support manual entry fallback?** (Yes — some users don't have wearables)
2. **How often to sync?** (Daily at 6am + manual "sync now" button)
3. **Show raw data to users?** (No — keep it simple, just show adjusted targets)
4. **Allow multiple wearables?** (No for MVP — one primary source to avoid conflicts)
5. **Charge separately for wearable integration?** (No — bundle with Premium)

---

## Conclusion

Wearable integration is a **critical differentiator** for NutBot in v2.0. It transforms the app from a manual tracker to an intelligent, adaptive nutrition assistant.

By prioritizing Apple Health first, we cover the majority of our target market (health-conscious iOS users). Fitbit and Google Fit expand our reach without overextending development resources.

**Next Steps:**
1. Finalize Apple Health integration spec (December 2024)
2. Begin development (Q1 2025)
3. Beta test with 50-100 users (Q2 2025)
4. Public launch (Q2 2025)

---

**Document Owner:** Product & Engineering  
**Last Updated:** November 2024  
**Next Review:** Q1 2025
