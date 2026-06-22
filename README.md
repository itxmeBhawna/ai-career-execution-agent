# AI Career Execution Coach

An AI-powered career coach that helps users reduce overwhelm, prioritize high-impact tasks, track meaningful progress, and focus on the most important action to take next.

---

## Problem

Many students and early-career professionals know what they should do but struggle to decide what deserves attention right now.

When multiple goals compete for time, people often become overwhelmed, switch contexts too frequently, or end up making little meaningful progress.

AI Career Execution Coach is designed to reduce that cognitive load by identifying the highest-impact next action and helping users stay focused.

---

## Features

### AI Prioritization Engine

- Analyzes the user's current situation
- Identifies the most important task to focus on
- Reduces unnecessary task switching
- Recommends what should be ignored for now

### Personalized Memory

- Stores goals
- Tracks progress
- Records milestones
- Uses historical context when generating guidance

### Progress Dashboard

- Goal tracking
- Progress history
- Milestone history
- Streak tracking

### AI Coaching Interface

Provides structured responses including:

- Situation Assessment
- Today's Focus
- What To Ignore Today
- Why These Priorities Were Chosen
- Next Action
- Closing Note

### User Identity System

- UUID-based user identification
- Separate display name support
- Persistent user history

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- React Markdown

### Backend

- FastAPI
- Python

### Database

- MongoDB Atlas

### AI Layer

- Google Gemini API

---

## Architecture

User → React Frontend → FastAPI Backend → AI Reasoning Agent → Gemini

                                                     ↓

                                             MongoDB Memory System

---

## How It Works

1. User describes their current situation.
2. AI analyzes goals, progress, and history.
3. System identifies the highest-leverage next action.
4. AI generates a structured execution plan.
5. Goals, progress, and milestones are updated automatically.
6. Dashboard refreshes with the latest information.

---

## Screenshots

### Home Page

![Home Page](screenshots/Home-page.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### AI Coach Conversation

![AI Coach Conversation](screenshots/Coach-chat.png)

## Local Setup

### Clone Repository

```bash
git clone https://github.com/itxmeBhawna/ai-career-execution-agent.git
cd ai-career-execution-agent
```

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Future Improvements

- Additional AI model fallbacks
- Voice input support
- Smart progress analytics
- Enhanced memory extraction
- Deployment monitoring
- Mobile-friendly experience

---

## Author

Bhawna Kumari

B.Tech Information Technology

Indraprastha Engineering College

---

## Disclaimer

AI Career Execution Coach is designed to assist with prioritization and decision support.

AI responses may be inaccurate and should not be treated as professional, legal, financial, medical, or career advice.