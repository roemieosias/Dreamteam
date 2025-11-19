import { supabase } from './supabase';
import { createEvent, joinEvent, createOrUpdateEventProfile } from './supabase-events';
import { generateMatchesForUser } from './supabase-matches';

/**
 * Seed test data for development and testing
 * Creates a test event with multiple participants and generates matches
 */

export async function seedTestData(hostUserId: string) {
  try {
    console.log('🌱 Starting data seed...');

    // 1. Create a test event
    console.log('Creating test event...');
    const { event, error: eventError } = await createEvent(
      hostUserId,
      'HackMIT 2025',
      'Build the future of education with AI',
      new Date('2025-03-15').toISOString(),
      new Date('2025-03-17').toISOString()
    );

    if (eventError || !event) {
      throw new Error(`Failed to create event: ${eventError}`);
    }

    console.log(`✅ Event created with code: ${event.code}`);

    // 2. Create test participants (you'll need to create these users first in Supabase Auth)
    const testParticipants = [
      {
        name: 'Sarah Chen',
        role: 'Developer',
        major: 'Computer Science',
        year: 'Junior',
        skills_have: ['React', 'Python', 'Node.js', 'TypeScript'],
        skills_need: ['UI/UX Design', 'Figma'],
        bio: 'Full-stack developer passionate about building accessible web apps',
      },
      {
        name: 'Marcus Johnson',
        role: 'Designer',
        major: 'Interaction Design',
        year: 'Senior',
        skills_have: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
        skills_need: ['React', 'JavaScript'],
        bio: 'Designer who loves creating beautiful, user-centered experiences',
      },
      {
        name: 'Priya Patel',
        role: 'Product Manager',
        major: 'Business Analytics',
        year: 'Sophomore',
        skills_have: ['Product Strategy', 'User Research', 'Jira', 'Agile'],
        skills_need: ['Python', 'Data Analysis'],
        bio: 'PM with a focus on user empathy and data-driven decisions',
      },
      {
        name: 'Alex Rivera',
        role: 'Developer',
        major: 'Software Engineering',
        year: 'Senior',
        skills_have: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
        skills_need: ['UI/UX Design', 'Product Strategy'],
        bio: 'ML engineer interested in applying AI to real-world problems',
      },
      {
        name: 'Jordan Kim',
        role: 'Designer',
        major: 'Visual Design',
        year: 'Junior',
        skills_have: ['Graphic Design', 'Figma', 'Illustration', 'Branding'],
        skills_need: ['React', 'Animation'],
        bio: 'Visual designer with a passion for motion graphics and branding',
      },
      {
        name: 'Taylor Martinez',
        role: 'Developer',
        major: 'Computer Science',
        year: 'Freshman',
        skills_have: ['JavaScript', 'HTML/CSS', 'Git'],
        skills_need: ['React', 'Backend Development'],
        bio: 'Eager to learn and build my first hackathon project!',
      },
    ];

    // Note: This is a simplified version. In reality, you'd need to:
    // 1. Create auth users for each participant
    // 2. Join them to the event
    // 3. Create their event profiles

    console.log('⚠️  Note: To fully seed data, you need to:');
    console.log('1. Create auth users in Supabase Auth dashboard');
    console.log('2. Get their user IDs');
    console.log('3. Call joinEvent() and createOrUpdateEventProfile() for each');
    console.log('4. Then call generateMatchesForUser() for each participant');

    return {
      event,
      eventCode: event.code,
      participants: testParticipants,
      message: 'Event created! See console for next steps.',
    };
  } catch (error: any) {
    console.error('❌ Seed error:', error);
    return { error: error.message };
  }
}

/**
 * Helper to create a full test participant
 * (requires user to be created in Supabase Auth first)
 */
export async function createTestParticipant(
  userId: string,
  eventId: string,
  participantData: {
    name: string;
    role: string;
    major: string;
    year: string;
    skills_have: string[];
    skills_need: string[];
    bio: string;
  }
) {
  try {
    // 1. Join event
    const { error: joinError } = await joinEvent(userId, eventId);
    if (joinError) throw new Error(`Join error: ${joinError}`);

    // 2. Create event profile
    const { profile, error: profileError } = await createOrUpdateEventProfile(
      userId,
      eventId,
      participantData
    );
    if (profileError) throw new Error(`Profile error: ${profileError}`);

    // 3. Generate matches
    const { matches, error: matchError } = await generateMatchesForUser(userId, eventId);
    if (matchError) throw new Error(`Match error: ${matchError}`);

    console.log(`✅ Created participant: ${participantData.name} with ${matches.length} matches`);

    return { profile, matches, error: null };
  } catch (error: any) {
    console.error(`❌ Error creating participant ${participantData.name}:`, error);
    return { profile: null, matches: [], error: error.message };
  }
}

/**
 * Quick test to verify Supabase connection
 */
export async function testSupabaseConnection() {
  try {
    console.log('🔌 Testing Supabase connection...');

    // Test database connection
    const { data, error } = await supabase.from('users').select('count').limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error);
      return false;
    }

    console.log('✅ Supabase connection successful!');

    // Test auth
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      console.log('✅ User authenticated:', session.user.email);
    } else {
      console.log('ℹ️  No active session (not logged in)');
    }

    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
}

/**
 * Sample skill sets for testing
 */
export const SAMPLE_SKILLS = {
  technical: [
    'React',
    'Vue',
    'Angular',
    'Python',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Java',
    'C++',
    'Go',
    'Rust',
    'Swift',
    'Kotlin',
    'Ruby',
    'PHP',
    'HTML/CSS',
    'SQL',
    'MongoDB',
    'PostgreSQL',
    'GraphQL',
    'REST APIs',
    'AWS',
    'Docker',
    'Kubernetes',
    'Git',
    'CI/CD',
    'Testing',
    'Machine Learning',
    'TensorFlow',
    'PyTorch',
    'Data Science',
    'Computer Vision',
    'NLP',
  ],
  design: [
    'Figma',
    'Sketch',
    'Adobe XD',
    'UI/UX Design',
    'Prototyping',
    'User Research',
    'Wireframing',
    'Visual Design',
    'Graphic Design',
    'Illustration',
    'Animation',
    'Motion Graphics',
    'Design Systems',
    'Accessibility',
    'Branding',
    'Typography',
  ],
  product: [
    'Product Strategy',
    'Product Management',
    'User Research',
    'Data Analysis',
    'A/B Testing',
    'Agile',
    'Scrum',
    'Jira',
    'Roadmapping',
    'User Stories',
    'Market Research',
    'Analytics',
    'Product Marketing',
  ],
  business: [
    'Business Strategy',
    'Marketing',
    'Sales',
    'Finance',
    'Operations',
    'Project Management',
    'Leadership',
    'Public Speaking',
    'Writing',
    'Content Creation',
  ],
};

/**
 * Generate random participant data for testing
 */
export function generateRandomParticipant(): {
  name: string;
  role: string;
  major: string;
  year: string;
  skills_have: string[];
  skills_need: string[];
  bio: string;
} {
  const roles = ['Developer', 'Designer', 'Product Manager', 'Data Scientist'];
  const majors = [
    'Computer Science',
    'Software Engineering',
    'Interaction Design',
    'Business Analytics',
    'Data Science',
    'Visual Design',
  ];
  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

  const role = roles[Math.floor(Math.random() * roles.length)];
  let skillPool: string[] = [];

  if (role === 'Developer') {
    skillPool = SAMPLE_SKILLS.technical;
  } else if (role === 'Designer') {
    skillPool = SAMPLE_SKILLS.design;
  } else if (role === 'Product Manager') {
    skillPool = SAMPLE_SKILLS.product;
  } else {
    skillPool = [...SAMPLE_SKILLS.technical, ...SAMPLE_SKILLS.product];
  }

  // Pick random skills
  const shuffled = [...skillPool].sort(() => 0.5 - Math.random());
  const skills_have = shuffled.slice(0, 4);
  const skills_need = shuffled.slice(4, 6);

  return {
    name: `Test User ${Math.floor(Math.random() * 1000)}`,
    role,
    major: majors[Math.floor(Math.random() * majors.length)],
    year: years[Math.floor(Math.random() * years.length)],
    skills_have,
    skills_need,
    bio: `${role} looking to build something amazing at this hackathon!`,
  };
}
