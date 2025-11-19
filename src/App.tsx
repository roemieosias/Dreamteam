import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { SignUpPage } from './components/SignUpPage';
import { LoginPage } from './components/LoginPage';
import { CreateEventPage } from './components/CreateEventPage';
import { EventProfileSetup } from './components/EventProfileSetup';
import { MatchListPage } from './components/MatchListPage';
import { ConnectionsPage } from './components/ConnectionsPage';
import { ProfileSettingsPage } from './components/ProfileSettingsPage';
import { EventDashboard } from './components/EventDashboard';
import { WaitingRoom } from './components/WaitingRoom';
import { DeveloperNavigation } from './components/DeveloperNavigation';

// Mock data for matches
const mockMatches = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Full-Stack Developer',
    major: 'Computer Science',
    year: 'Junior',
    skillsIHave: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    skillsINeed: ['UI/UX Design', 'Mobile Dev'],
    bio: 'Passionate about building scalable web apps. Looking for designers and mobile devs to team up for the hackathon!',
    compatibility: 92,
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    role: 'UI/UX Designer',
    major: 'Design',
    year: 'Senior',
    skillsIHave: ['Figma', 'UI/UX Design', 'Branding', 'Research'],
    skillsINeed: ['Frontend', 'Backend'],
    bio: 'Award-winning designer with 3 years of experience. Love creating intuitive user experiences.',
    compatibility: 88,
  },
  {
    id: '3',
    name: 'Jordan Kim',
    role: 'ML Engineer',
    major: 'Data Science',
    year: 'Graduate',
    skillsIHave: ['Python', 'Machine Learning', 'Data Science', 'APIs'],
    skillsINeed: ['Frontend', 'Product Management'],
    bio: 'ML enthusiast working on NLP projects. Looking to build AI-powered solutions.',
    compatibility: 85,
  },
  {
    id: '4',
    name: 'Taylor Brooks',
    role: 'Product Manager',
    major: 'Business',
    year: 'Senior',
    skillsIHave: ['Product Management', 'Research', 'Testing'],
    skillsINeed: ['Frontend', 'Backend', 'UI/UX Design'],
    bio: 'PM at a startup. Love turning ideas into products that users love.',
    compatibility: 81,
  },
];

export default function App() {
  // Page navigation
  const [currentPage, setCurrentPage] = useState<
    | 'landing'
    | 'signup'
    | 'login'
    | 'create'
    | 'eventProfileSetup'
    | 'matches'
    | 'connections'
    | 'settings'
    | 'eventDashboard'
    | 'waitingRoom'
    | 'developerNavigation'
  >('developerNavigation'); // Start at dev nav for easy testing

  // Global account state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  // Event management
  interface EventData {
    id: string;
    name: string;
    code: string;
    date?: string;
    role: 'host' | 'participant';
  }

  interface EventProfile {
    role: string;
    skillsIHave: string[];
    skillsINeed: string[];
    experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    bio: string;
  }

  const [events, setEvents] = useState<Record<string, EventData>>({});
  const [eventProfiles, setEventProfiles] = useState<Record<string, EventProfile>>({});
  const [currentEventId, setCurrentEventId] = useState<string>('');
  const [matchingPhases, setMatchingPhases] = useState<Record<string, 'not-started' | 'in-progress' | 'completed'>>({});

  // Matches and connections (scoped by event)
  const [eventMatches, setEventMatches] = useState<Record<string, any[]>>({});
  const [eventConnections, setEventConnections] = useState<Record<string, any[]>>({});

  // Participants (for host view)
  const [eventParticipants, setEventParticipants] = useState<Record<string, any[]>>({});

  // Global user profile (for settings page)
  const [globalUserProfile, setGlobalUserProfile] = useState<any>(null);

  // Helper to get current event
  const currentEvent = currentEventId ? events[currentEventId] : null;
  const currentEventProfile = currentEventId ? eventProfiles[currentEventId] : null;
  const currentMatchingPhase = currentEventId ? matchingPhases[currentEventId] || 'not-started' : 'not-started';

  // Auth handlers
  const handleSignUp = (data: { name: string; email: string; password: string }) => {
    setUserName(data.name);
    setUserEmail(data.email);
    setIsLoggedIn(true);
    setCurrentPage('landing');
  };

  const handleLogin = (data: { email: string; password: string }) => {
    setUserName('Demo User');
    setUserEmail(data.email);
    setIsLoggedIn(true);
    setCurrentPage('landing');
  };

  // Join Event flow (participant)
  const handleJoinEvent = (code: string) => {
    // TESTING MODE: Accept any code
    const eventId = code || 'TEST-EVENT';
    const eventName = 'Test Hackathon Event';

    // Check if already joined this event
    if (events[eventId]) {
      // Already joined, check if profile exists
      setCurrentEventId(eventId);
      if (eventProfiles[eventId]) {
        // Has profile - go to matches
        setCurrentPage('matches');
      } else {
        // No profile - go to profile setup
        setCurrentPage('eventProfileSetup');
      }
      return;
    }

    // New event - add to events and go to profile setup
    setEvents((prev) => ({
      ...prev,
      [eventId]: {
        id: eventId,
        name: eventName,
        code: eventId,
        role: 'participant',
      },
    }));
    setCurrentEventId(eventId);
    setEventMatches((prev) => ({ ...prev, [eventId]: mockMatches }));
    setEventConnections((prev) => ({ ...prev, [eventId]: [] }));
    setCurrentPage('eventProfileSetup'); // Go directly to profile setup
  };

  // Create Event flow (host)
  const handleCreateEvent = (code: string, name: string) => {
    const eventId = code;

    setEvents((prev) => ({
      ...prev,
      [eventId]: {
        id: eventId,
        name,
        code,
        role: 'host',
      },
    }));
    setCurrentEventId(eventId);
    setMatchingPhases((prev) => ({ ...prev, [eventId]: 'not-started' }));
    setEventParticipants((prev) => ({
      ...prev,
      [eventId]: [
        { id: '1', name: 'Demo Participant 1', status: 'Waiting', joinedAt: new Date() },
        { id: '2', name: 'Demo Participant 2', status: 'Waiting', joinedAt: new Date() },
        { id: '3', name: 'Demo Participant 3', status: 'Waiting', joinedAt: new Date() },
      ],
    }));
    setCurrentPage('eventDashboard');
  };

  // Event Profile Setup
  const handleEventProfileComplete = (profile: EventProfile) => {
    if (!currentEventId) return;

    setEventProfiles((prev) => ({
      ...prev,
      [currentEventId]: profile,
    }));
    // After completing profile, go to matches
    setCurrentPage('matches');
  };

  // Host controls
  const handleBeginMatching = () => {
    if (!currentEventId) return;

    setMatchingPhases((prev) => ({ ...prev, [currentEventId]: 'in-progress' }));

    // Update all participants status to Matching
    setEventParticipants((prev) => ({
      ...prev,
      [currentEventId]: prev[currentEventId]?.map((p) => ({ ...p, status: 'Matching' })) || [],
    }));

    // Simulate matching completion after 3 seconds
    setTimeout(() => {
      setMatchingPhases((prev) => ({ ...prev, [currentEventId]: 'completed' }));
      setEventParticipants((prev) => ({
        ...prev,
        [currentEventId]: prev[currentEventId]?.map((p) => ({ ...p, status: 'Matched' })) || [],
      }));
    }, 3000);
  };

  const handleStartEvent = () => {
    setCurrentPage('matches');
  };

  const handleLeaveEvent = () => {
    setCurrentPage('landing');
    setCurrentEventId('');
  };

  // Match actions
  const handleInterested = (matchId: string) => {
    if (!currentEventId) return;

    const matches = eventMatches[currentEventId] || [];
    const match = matches.find((m) => m.id === matchId);
    if (match) {
      setEventConnections((prev) => ({
        ...prev,
        [currentEventId]: [...(prev[currentEventId] || []), { ...match, status: 'pending' }],
      }));
      setEventMatches((prev) => ({
        ...prev,
        [currentEventId]: matches.filter((m) => m.id !== matchId),
      }));
    }
  };

  const handlePass = (matchId: string) => {
    if (!currentEventId) return;

    const matches = eventMatches[currentEventId] || [];
    setEventMatches((prev) => ({
      ...prev,
      [currentEventId]: matches.filter((m) => m.id !== matchId),
    }));
  };

  const handleViewContact = (connectionId: string) => {
    console.log('Viewing contact:', connectionId);
  };

  const handleSaveProfile = (profile: any) => {
    setGlobalUserProfile(profile);
    console.log('Profile saved:', profile);
  };

  const handleNavigate = (page: string) => {
    // Special handling for pages that need setup
    if (page === 'eventProfileSetup' && !currentEventId) {
      // Setup a dummy event first
      const dummyEventId = 'DEMO-EVENT';
      setEvents((prev) => ({
        ...prev,
        [dummyEventId]: {
          id: dummyEventId,
          name: 'Demo Hackathon Event',
          code: dummyEventId,
          role: 'participant',
        },
      }));
      setCurrentEventId(dummyEventId);
      setMatchingPhases((prev) => ({ ...prev, [dummyEventId]: 'not-started' }));
      setEventMatches((prev) => ({ ...prev, [dummyEventId]: mockMatches }));
      setEventConnections((prev) => ({ ...prev, [dummyEventId]: [] }));
    }

    if (page === 'eventDashboard' && !currentEventId) {
      // Setup a dummy event as host
      const dummyEventId = 'HOST-DEMO';
      setEvents((prev) => ({
        ...prev,
        [dummyEventId]: {
          id: dummyEventId,
          name: 'Demo Hosted Event',
          code: dummyEventId,
          role: 'host',
        },
      }));
      setCurrentEventId(dummyEventId);
      setMatchingPhases((prev) => ({ ...prev, [dummyEventId]: 'not-started' }));
      setEventParticipants((prev) => ({
        ...prev,
        [dummyEventId]: [
          { id: '1', name: 'Demo Participant 1', status: 'Waiting', joinedAt: new Date() },
          { id: '2', name: 'Demo Participant 2', status: 'Waiting', joinedAt: new Date() },
          { id: '3', name: 'Demo Participant 3', status: 'Waiting', joinedAt: new Date() },
        ],
      }));
    }

    if (page === 'waitingRoom' && !currentEventId) {
      // Setup a dummy event first
      const dummyEventId = 'WAIT-DEMO';
      setEvents((prev) => ({
        ...prev,
        [dummyEventId]: {
          id: dummyEventId,
          name: 'Demo Waiting Event',
          code: dummyEventId,
          role: 'participant',
        },
      }));
      setCurrentEventId(dummyEventId);
      setMatchingPhases((prev) => ({ ...prev, [dummyEventId]: 'not-started' }));
      setEventParticipants((prev) => ({
        ...prev,
        [dummyEventId]: [
          { id: '1', name: 'Demo Participant 1', status: 'Waiting', joinedAt: new Date() },
          { id: '2', name: 'Demo Participant 2', status: 'Waiting', joinedAt: new Date() },
        ],
      }));
    }

    if (page === 'matches') {
      // Setup dummy event with profile if needed
      if (!currentEventId) {
        const dummyEventId = 'MATCH-DEMO';
        setEvents((prev) => ({
          ...prev,
          [dummyEventId]: {
            id: dummyEventId,
            name: 'Demo Match Event',
            code: dummyEventId,
            role: 'participant',
          },
        }));
        setEventProfiles((prev) => ({
          ...prev,
          [dummyEventId]: {
            role: 'developer',
            skillsIHave: ['React', 'TypeScript'],
            skillsINeed: ['UI/UX'],
            experienceLevel: 'Intermediate',
            bio: 'Demo profile',
          },
        }));
        setCurrentEventId(dummyEventId);
        setMatchingPhases((prev) => ({ ...prev, [dummyEventId]: 'completed' }));
        setEventMatches((prev) => ({ ...prev, [dummyEventId]: mockMatches }));
        setEventConnections((prev) => ({ ...prev, [dummyEventId]: [] }));
      } else if (!eventProfiles[currentEventId]) {
        // Has event but no profile, go to profile setup instead
        setCurrentPage('eventProfileSetup');
        return;
      }
    }

    if (page === 'connections') {
      // Setup dummy event with profile and connections if needed
      if (!currentEventId) {
        const dummyEventId = 'CONN-DEMO';
        setEvents((prev) => ({
          ...prev,
          [dummyEventId]: {
            id: dummyEventId,
            name: 'Demo Connections Event',
            code: dummyEventId,
            role: 'participant',
          },
        }));
        setEventProfiles((prev) => ({
          ...prev,
          [dummyEventId]: {
            role: 'developer',
            skillsIHave: ['React', 'TypeScript'],
            skillsINeed: ['UI/UX'],
            experienceLevel: 'Intermediate',
            bio: 'Demo profile',
          },
        }));
        setCurrentEventId(dummyEventId);
        setEventConnections((prev) => ({
          ...prev,
          [dummyEventId]: [
            { ...mockMatches[0], status: 'matched' as const, matchedAt: new Date().toISOString() },
          ],
        }));
      }
    }

    setCurrentPage(page as any);
  };

  // Event switcher
  const handleSelectEvent = (eventId: string) => {
    setCurrentEventId(eventId);
    if (!eventProfiles[eventId]) {
      setCurrentPage('eventProfileSetup');
    } else {
      setCurrentPage('waitingRoom');
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E10] text-white">
      {currentPage === 'landing' && (
        <LandingPage
          onJoinEvent={handleJoinEvent}
          onCreateEvent={() => setCurrentPage('create')}
          onLogin={() => setCurrentPage('login')}
          onSignUp={() => setCurrentPage('signup')}
        />
      )}
      {currentPage === 'signup' && (
        <SignUpPage
          onSignUp={handleSignUp}
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToHome={() => setCurrentPage('landing')}
        />
      )}
      {currentPage === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToSignUp={() => setCurrentPage('signup')}
          onForgotPassword={() => console.log('Forgot password')}
          onNavigateToHome={() => setCurrentPage('landing')}
        />
      )}
      {currentPage === 'create' && (
        <CreateEventPage
          onEventCreated={handleCreateEvent}
          onBack={() => setCurrentPage('landing')}
          onLogin={() => setCurrentPage('login')}
          onSignUp={() => setCurrentPage('signup')}
        />
      )}
      {currentPage === 'eventProfileSetup' && currentEvent && (
        <EventProfileSetup
          eventName={currentEvent.name}
          eventDate={currentEvent.date}
          userName={userName || 'Guest'}
          onComplete={handleEventProfileComplete}
        />
      )}
      {currentPage === 'matches' && currentEvent && currentEventProfile && (
        <MatchListPage
          matches={eventMatches[currentEventId] || []}
          onInterested={handleInterested}
          onPass={handlePass}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          eventName={currentEvent.name}
          eventDate={currentEvent.date}
          events={Object.values(events).map((e) => ({
            id: e.id,
            name: e.name,
            date: e.date,
            hasProfile: !!eventProfiles[e.id],
          }))}
          currentEventId={currentEventId}
          onSelectEvent={handleSelectEvent}
          currentUserSkills={currentEventProfile.skillsIHave}
          currentUserNeeds={currentEventProfile.skillsINeed}
        />
      )}
      {currentPage === 'connections' && currentEvent && (
        <ConnectionsPage
          connections={eventConnections[currentEventId] || []}
          onViewContact={handleViewContact}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          eventName={currentEvent.name}
          events={Object.values(events).map((e) => ({
            id: e.id,
            name: e.name,
            date: e.date,
            hasProfile: !!eventProfiles[e.id],
          }))}
          currentEventId={currentEventId}
          onSelectEvent={handleSelectEvent}
        />
      )}
      {currentPage === 'settings' && (
        <ProfileSettingsPage
          profile={
            globalUserProfile || {
              name: userName,
              email: userEmail || 'user@example.com',
              major: 'Computer Science',
              year: 'Junior',
              role: 'Full-Stack Developer',
              skillsIHave: ['React', 'TypeScript'],
              skillsINeed: ['UI/UX Design'],
              bio: '',
            }
          }
          onSave={handleSaveProfile}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      )}
      {currentPage === 'eventDashboard' && currentEvent && (
        <EventDashboard
          eventName={currentEvent.name}
          eventCode={currentEvent.code}
          participants={eventParticipants[currentEventId] || []}
          matchingPhase={currentMatchingPhase}
          onBeginMatching={handleBeginMatching}
          onStartEvent={handleStartEvent}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      )}
      {currentPage === 'waitingRoom' && currentEvent && (
        <WaitingRoom
          eventName={currentEvent.name}
          eventCode={currentEvent.code}
          participantCount={eventParticipants[currentEventId]?.length || 15}
          userName={userName || 'Guest'}
          onLeaveEvent={handleLeaveEvent}
          matchingStarted={currentMatchingPhase === 'in-progress' || currentMatchingPhase === 'completed'}
          hasProfile={!!currentEventProfile}
          onFillProfile={() => {
            // When matching starts and no profile yet, go to profile setup
            // When matching starts and profile exists, go to matches
            if (currentMatchingPhase === 'in-progress' || currentMatchingPhase === 'completed') {
              if (currentEventProfile) {
                setCurrentPage('matches');
              } else {
                setCurrentPage('eventProfileSetup');
              }
            }
          }}
        />
      )}
      {currentPage === 'developerNavigation' && <DeveloperNavigation onNavigate={handleNavigate} />}
    </div>
  );
}