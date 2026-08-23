export interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl: string
  role: 'patient' | 'hospital_admin' | 'government_official' | 'researcher'
  did: string
  walletAddress?: string
  organization?: string
}

export const MOCK_USERS: Record<string, UserProfile> = {
  patient: {
    id: 'usr_pat_8921',
    name: 'Elena Rostova',
    email: 'elena.rostova@nexus.id',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'patient',
    did: 'did:nexora:pat:8f9a2c1b84e031da',
    walletAddress: '0x71C...39B2'
  },
  hospital_admin: {
    id: 'usr_hosp_4412',
    name: 'Dr. Marcus Vance (Chief of Informatics)',
    email: 'm.vance@citycare-health.org',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    role: 'hospital_admin',
    did: 'did:nexora:org:citycare:901b',
    organization: 'City Care Health System'
  },
  government_official: {
    id: 'usr_gov_1109',
    name: 'Sophia Chen (Dir. National Health Access)',
    email: 's.chen@health.gov.nx',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'government_official',
    did: 'did:nexora:gov:national-access:44f2',
    organization: 'National Health Directorate'
  },
  researcher: {
    id: 'usr_res_6521',
    name: 'Dr. Ananya Patel (Lead Epidemiologist)',
    email: 'ananya.p@biogen-institute.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'researcher',
    did: 'did:nexora:res:biogen-inst:77a1',
    organization: 'BioGen Institute for Genomic Medicine'
  }
}

export interface Provider {
  id: string
  name: string
  title: string
  specialty: string
  hospital: string
  rating: number
  reviewsCount: number
  location: string
  experienceYears: number
  fee: string
  availableDays: string[]
  availableSlots: string[]
  avatarUrl: string
  did: string
  credentialId: string
  credentialIssuer: string
  verificationStatus: 'verified' | 'unverified'
  zkProofBadge: string
  bio: string
}

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'prov_card_01',
    name: 'Dr. Sarah Al-Mansoor, MD, FACC',
    title: 'Senior Interventional Cardiologist',
    specialty: 'Cardiology',
    hospital: 'Apex Heart & Vascular Institute',
    rating: 4.98,
    reviewsCount: 142,
    location: 'Metropolis Medical District, Sector 4',
    experienceYears: 16,
    fee: '$180 (Tier A Copay Eligible)',
    availableDays: ['Mon, Aug 25', 'Wed, Aug 27', 'Fri, Aug 29'],
    availableSlots: ['09:30 AM', '11:15 AM', '02:00 PM', '04:30 PM'],
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    did: 'did:nexora:prov:card:91a7e2b10',
    credentialId: 'vc_med_lic_882910_cardiology',
    credentialIssuer: 'National Board of Medical Examiners (did:nexora:gov:nbme)',
    verificationStatus: 'verified',
    zkProofBadge: 'ZK-BoardCertified',
    bio: 'Specializing in acute cardiac assessment, microvascular angina, and non-invasive hemodynamic monitoring.'
  },
  {
    id: 'prov_neuro_02',
    name: 'Dr. Julian Thorne, MD, PhD',
    title: 'Consultant Neurologist & Neuroscientist',
    specialty: 'Neurology',
    hospital: 'City Care Academic Health System',
    rating: 4.95,
    reviewsCount: 98,
    location: 'Innovation Boulevard, North Wing',
    experienceYears: 14,
    fee: '$210 (National Scheme Eligible)',
    availableDays: ['Tue, Aug 26', 'Thu, Aug 28', 'Mon, Sep 1'],
    availableSlots: ['10:00 AM', '01:30 PM', '03:45 PM'],
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    did: 'did:nexora:prov:neuro:44b1c8f90',
    credentialId: 'vc_med_lic_771922_neurology',
    credentialIssuer: 'Council of Clinical Neurologists (did:nexora:gov:ccn)',
    verificationStatus: 'verified',
    zkProofBadge: 'ZK-FellowshipVerified',
    bio: 'Pioneer in migraine genetics, neuro-inflammatory markers, and cognitive telemetry.'
  },
  {
    id: 'prov_endo_03',
    name: 'Dr. Priya Ramanathan, MD',
    title: 'Endocrinology & Metabolic Specialist',
    specialty: 'Endocrinology',
    hospital: 'Metropolitan General Hospital',
    rating: 4.91,
    reviewsCount: 167,
    location: 'Downtown Health Plaza, 6th Fl',
    experienceYears: 12,
    fee: '$160 (Scheme Fully Covered)',
    availableDays: ['Today', 'Tomorrow', 'Thu, Aug 28'],
    availableSlots: ['11:00 AM', '02:15 PM', '05:00 PM'],
    avatarUrl: 'https://images.unsplash.com/photo-1594824813588-e2150961b7f0?w=200&auto=format&fit=crop&q=80',
    did: 'did:nexora:prov:endo:38d94e101',
    credentialId: 'vc_med_lic_551029_endocrinology',
    credentialIssuer: 'National Board of Medical Examiners (did:nexora:gov:nbme)',
    verificationStatus: 'verified',
    zkProofBadge: 'ZK-BoardCertified',
    bio: 'Focused on metabolic disorders, autoimmune thyroiditis, and precision hormonal interventions.'
  },
  {
    id: 'prov_pulm_04',
    name: 'Dr. Liam Vance, MD, FCCP',
    title: 'Pulmonary & Critical Care Medicine',
    specialty: 'Pulmonology',
    hospital: 'Apex Heart & Vascular Institute',
    rating: 4.88,
    reviewsCount: 84,
    location: 'Metropolis Medical District, Sector 4',
    experienceYears: 18,
    fee: '$195 (Tier B Copay)',
    availableDays: ['Wed, Aug 27', 'Thu, Aug 28', 'Fri, Aug 29'],
    availableSlots: ['08:45 AM', '12:00 PM', '03:30 PM'],
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    did: 'did:nexora:prov:pulm:11a003f42',
    credentialId: 'vc_med_lic_902114_pulmonary',
    credentialIssuer: 'Thoracic Medical Board (did:nexora:gov:tmb)',
    verificationStatus: 'verified',
    zkProofBadge: 'ZK-BoardCertified',
    bio: 'Expert in respiratory mechanics, post-viral pulmonary fibrotic pathways, and thoracic diagnostics.'
  }
]

export interface ConsentRecord {
  id: string
  entityName: string
  entityType: 'hospital' | 'lab' | 'government' | 'research'
  entityDid: string
  dataType: string
  dataScope: string[]
  purpose: string
  validUntil: string
  grantedAt: string
  status: 'active' | 'expired' | 'revoked'
  contractAddress: string
  txHash: string
}

export const MOCK_CONSENTS: ConsentRecord[] = [
  {
    id: 'cns_8910a72f',
    entityName: 'Apex Heart & Vascular Institute',
    entityType: 'hospital',
    entityDid: 'did:nexora:org:apex-heart:8812',
    dataType: 'Cardiovascular Telemetry & Echocardiogram Scans',
    dataScope: ['ECG Reports (2024-2026)', 'Cardiac Stress Scans', 'Medication History'],
    purpose: 'Acute consultation, diagnostics and treatment planning',
    validUntil: '2026-11-20T00:00:00Z',
    grantedAt: '2026-08-20T09:14:00Z',
    status: 'active',
    contractAddress: '0x8849b...29ef',
    txHash: '0x3f9a71b28d09e6c41258d4a97120ce910fb8230198cae4125698b7201cda8901'
  },
  {
    id: 'cns_9941b21e',
    entityName: 'City Care Academic Health System',
    entityType: 'hospital',
    entityDid: 'did:nexora:org:citycare:901b',
    dataType: 'Complete Laboratory Blood Panels',
    dataScope: ['CBC with Differential', 'Lipid Panel', 'Metabolic Markers'],
    purpose: 'Follow-up lab evaluation and cross-reference',
    validUntil: '2026-09-15T00:00:00Z',
    grantedAt: '2026-07-15T14:30:00Z',
    status: 'active',
    contractAddress: '0x8849b...29ef',
    txHash: '0x1c8b9201f89aa012458e019284ba710928cd9128038fe9102837410293847291'
  },
  {
    id: 'cns_4412c98a',
    entityName: 'National Health Directorate (Scheme Gateway)',
    entityType: 'government',
    entityDid: 'did:nexora:gov:national-access:44f2',
    dataType: 'Zero-Knowledge Income & Residency Proof',
    dataScope: ['ZK-Proof: Income < $65k/yr', 'ZK-Proof: Metropolis Resident'],
    purpose: 'Annual Government Healthcare Subsidy Tier-1 Eligibility Verification',
    validUntil: '2027-01-01T00:00:00Z',
    grantedAt: '2026-01-01T10:00:00Z',
    status: 'active',
    contractAddress: '0x8849b...29ef',
    txHash: '0x9920184710293847291823749102938471029384710293847102938471029384'
  },
  {
    id: 'cns_1029d33c',
    entityName: 'BioGen Epidemiological Research Consortium',
    entityType: 'research',
    entityDid: 'did:nexora:res:biogen-inst:77a1',
    dataType: 'De-identified Genomic Markers (Chr 4 & 9)',
    dataScope: ['Anonymized Allele Variants', 'No Identifiers (k-anonymity=50)'],
    purpose: 'Public health cardiovascular cohort study',
    validUntil: '2026-06-30T00:00:00Z',
    grantedAt: '2025-06-30T11:00:00Z',
    status: 'expired',
    contractAddress: '0x8849b...29ef',
    txHash: '0x5501928374102938471029384710293847102938471029384710293847102938'
  },
  {
    id: 'cns_6632e88b',
    entityName: 'OmniDiagnostics Lab Network',
    entityType: 'lab',
    entityDid: 'did:nexora:org:omnidiag:3301',
    dataType: 'Historical Imaging Archive (2020-2022)',
    dataScope: ['Chest X-Rays', 'Abdominal Ultrasound'],
    purpose: 'Secondary opinion comparison',
    validUntil: '2026-05-01T00:00:00Z',
    grantedAt: '2026-04-01T08:20:00Z',
    status: 'revoked',
    contractAddress: '0x8849b...29ef',
    txHash: '0x8839201948201948201948201948201948201948201948201948201948201948'
  }
]

export interface AuditEntry {
  id: string
  timestamp: string
  entity: string
  entityDid: string
  action: string
  actionType: 'access' | 'verify' | 'train' | 'grant' | 'revoke'
  purpose: string
  dataAccessed: string
  txHash: string
  blockNumber: number
  zkVerified: boolean
}

export const MOCK_AUDIT_TRAIL: AuditEntry[] = [
  {
    id: 'aud_998120',
    timestamp: '2026-08-23T09:42:15Z',
    entity: 'Apex Heart & Vascular Institute',
    entityDid: 'did:nexora:org:apex-heart:8812',
    action: 'Accessed medical report',
    actionType: 'access',
    purpose: 'Pre-consultation clinical evaluation by Dr. Sarah Al-Mansoor',
    dataAccessed: 'Echocardiogram Series #4402 + Lipid Panel (Encrypted IPFS CID: QmZ4t...89x)',
    txHash: '0x4e8a910bf23c91a082348a0194b8e210984a9103847102938471029384710293',
    blockNumber: 19482012,
    zkVerified: false
  },
  {
    id: 'aud_998119',
    timestamp: '2026-08-23T09:41:02Z',
    entity: 'Nexora Government Gateway Agent',
    entityDid: 'did:nexora:gov:national-access:44f2',
    action: 'Verified eligibility via zero-knowledge proof',
    actionType: 'verify',
    purpose: 'Cardiovascular Care Subsidy Tier-1 qualification check',
    dataAccessed: 'Zero-Knowledge Proof verified (Income < $65k/yr without revealing exact salary)',
    txHash: '0x9183740192837401928374019283740192837401928374019283740192837401',
    blockNumber: 19482009,
    zkVerified: true
  },
  {
    id: 'aud_998118',
    timestamp: '2026-08-22T14:15:30Z',
    entity: 'City Care Academic Health System',
    entityDid: 'did:nexora:org:citycare:901b',
    action: 'Trained on anonymized data',
    actionType: 'train',
    purpose: 'Federated Model Training Round #142 (Cardiac Event Predictor v3.2)',
    dataAccessed: 'Local model gradient computed on-device; raw record never transmitted',
    txHash: '0x7728194019283740192837401928374019283740192837401928374019283740',
    blockNumber: 19478401,
    zkVerified: true
  },
  {
    id: 'aud_998117',
    timestamp: '2026-08-20T09:14:00Z',
    entity: 'Elena Rostova (Patient Agent)',
    entityDid: 'did:nexora:pat:8f9a2c1b84e031da',
    action: 'Signed smart contract consent grant',
    actionType: 'grant',
    purpose: 'Granted temporary access to Apex Heart & Vascular Institute',
    dataAccessed: 'Consent Contract #cns_8910a72f recorded to ledger',
    txHash: '0x3f9a71b28d09e6c41258d4a97120ce910fb8230198cae4125698b7201cda8901',
    blockNumber: 19472190,
    zkVerified: false
  },
  {
    id: 'aud_998116',
    timestamp: '2026-08-18T16:22:40Z',
    entity: 'City Care Academic Health System',
    entityDid: 'did:nexora:org:citycare:901b',
    action: 'Accessed medical report',
    actionType: 'access',
    purpose: 'Routine lab panel intake review',
    dataAccessed: 'CBC with Differential + Comprehensive Metabolic Panel',
    txHash: '0x1c8b9201f89aa012458e019284ba710928cd9128038fe9102837410293847291',
    blockNumber: 19468920,
    zkVerified: false
  },
  {
    id: 'aud_998115',
    timestamp: '2026-08-10T11:05:12Z',
    entity: 'Elena Rostova (Patient Agent)',
    entityDid: 'did:nexora:pat:8f9a2c1b84e031da',
    action: 'Revoked consent contract',
    actionType: 'revoke',
    purpose: 'Revoked historical imaging access from OmniDiagnostics Lab',
    dataAccessed: 'Consent Contract #cns_6632e88b marked REVOKED on-chain',
    txHash: '0x8839201948201948201948201948201948201948201948201948201948201948',
    blockNumber: 19451102,
    zkVerified: false
  }
]

export interface AgentChatMessage {
  id: string
  sender: 'patient' | 'patient_agent' | 'hospital_agent' | 'government_agent'
  agentName: string
  agentRole: string
  avatarType: string
  timestamp: string
  content: string
  activeRoutingNodes?: ('patient' | 'patient_agent' | 'hospital_agent' | 'government_agent' | 'blockchain')[]
  zkProof?: {
    verified: boolean
    claim: string
    statement: string
    proofHash: string
    privacyGuarantee: string
  }
  suggestedActions?: { label: string; actionId: string; href?: string }[]
}

export const INITIAL_AGENT_THREAD: AgentChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'patient',
    agentName: 'Elena Rostova',
    agentRole: 'Patient',
    avatarType: 'patient',
    timestamp: '10:14 AM',
    content: "I've been having mild tightness in my chest when climbing stairs for the last 3 days. I want to see a cardiologist this week, but I need to make sure my government health subsidy covers the consultation and diagnostics without revealing my full tax bracket."
  },
  {
    id: 'msg_2',
    sender: 'patient_agent',
    agentName: 'Patient Agent (Autonomous Orchestrator)',
    agentRole: 'Patient Proxy',
    avatarType: 'patient_agent',
    timestamp: '10:14 AM',
    content: "Understood. I am parsing your symptom profile and orchestrating inquiries. I will contact City Care and Apex Heart Hospital Agents for immediate slot availability, while concurrently querying the Government Scheme Agent with a Zero-Knowledge proof of your income qualification.",
    activeRoutingNodes: ['patient', 'patient_agent']
  },
  {
    id: 'msg_3',
    sender: 'government_agent',
    agentName: 'National Scheme Gateway Agent',
    agentRole: 'Government Protocol',
    avatarType: 'government_agent',
    timestamp: '10:15 AM',
    content: "Received eligibility verification request for Scheme #NX-GOV-CARDIO-2026. Performing cryptographic verification against state registry.",
    activeRoutingNodes: ['patient_agent', 'government_agent', 'blockchain'],
    zkProof: {
      verified: true,
      claim: 'Cardiovascular Care Subsidy Tier-1 Eligibility (Income < $65,000 & Resident)',
      statement: 'Zero-Knowledge condition met: Elena Rostova qualifies for 100% diagnostic coverage and $0 copay.',
      proofHash: 'zkSNARK:0x98f4a...e102',
      privacyGuarantee: 'Verified cryptographically. Your exact income ($54,200) and tax records were NEVER disclosed to the hospital or third parties.'
    }
  },
  {
    id: 'msg_4',
    sender: 'hospital_agent',
    agentName: 'Apex Heart Hospital Agent',
    agentRole: 'Provider Node (did:nexora:org:apex-heart)',
    avatarType: 'hospital_agent',
    timestamp: '10:15 AM',
    content: "Apex Heart & Vascular Institute has verified Dr. Sarah Al-Mansoor (Senior Interventional Cardiologist, DID Verified) has 2 urgent evaluation slots on Wednesday, Aug 27 at 09:30 AM and 02:00 PM. We have pre-authorized the Tier-1 government subsidy voucher.",
    activeRoutingNodes: ['patient_agent', 'hospital_agent']
  },
  {
    id: 'msg_5',
    sender: 'patient_agent',
    agentName: 'Patient Agent (Synthesizer)',
    agentRole: 'Patient Proxy',
    avatarType: 'patient_agent',
    timestamp: '10:16 AM',
    content: "Both agents have responded. Dr. Sarah Al-Mansoor is available Wednesday at 09:30 AM with $0 out-of-pocket cost via your ZK-verified subsidy. Would you like me to reserve this slot and draft a 72-hour scoped consent contract for your cardiac telemetry?",
    activeRoutingNodes: ['patient_agent', 'patient'],
    suggestedActions: [
      { label: 'Book Wednesday 09:30 AM with Dr. Al-Mansoor', actionId: 'book_slot', href: '/dashboard/book/prov_card_01' },
      { label: 'View Scoped Consent Preview', actionId: 'view_consent', href: '/dashboard/consent' },
      { label: 'Check Other Providers', actionId: 'find_care', href: '/dashboard/find-care' }
    ]
  }
]

export interface MedicalRecord {
  id: string
  title: string
  category: 'Cardiology' | 'Hematology' | 'Endocrinology' | 'Imaging' | 'Vaccination'
  date: string
  doctor: string
  hospital: string
  storageType: 'Decentralized Encrypted IPFS (Off-chain)'
  ipfsCid: string
  encryptionKeyFingerprint: string
  summary: string
  status: 'Encrypted & Off-Chain'
}

export const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 'rec_ech_4402',
    title: 'Echocardiogram & Doppler Flow Assessment',
    category: 'Cardiology',
    date: 'Aug 18, 2026',
    doctor: 'Dr. Sarah Al-Mansoor',
    hospital: 'Apex Heart & Vascular Institute',
    storageType: 'Decentralized Encrypted IPFS (Off-chain)',
    ipfsCid: 'QmZ4tK9eM8L12xPqA7s98f410293847192837491823',
    encryptionKeyFingerprint: 'ed25519:9f8a...4b12',
    summary: 'Normal left ventricular ejection fraction (LVEF 62%). No wall motion abnormalities. Minimal trace mitral regurgitation.',
    status: 'Encrypted & Off-Chain'
  },
  {
    id: 'rec_lab_9910',
    title: 'Comprehensive Lipid & Apolipoprotein Panel',
    category: 'Hematology',
    date: 'Jul 24, 2026',
    doctor: 'Dr. Priya Ramanathan',
    hospital: 'City Care Academic Health System',
    storageType: 'Decentralized Encrypted IPFS (Off-chain)',
    ipfsCid: 'QmY8xPqA7s98f410293847192837491823Z4tK9eM8L12',
    encryptionKeyFingerprint: 'ed25519:3c21...88ab',
    summary: 'Total Cholesterol: 184 mg/dL, HDL: 58 mg/dL, LDL: 104 mg/dL, Triglycerides: 110 mg/dL, ApoB: 82 mg/dL (Normal).',
    status: 'Encrypted & Off-Chain'
  },
  {
    id: 'rec_img_1102',
    title: 'High-Resolution Chest Radiograph (PA/Lateral)',
    category: 'Imaging',
    date: 'Jun 12, 2026',
    doctor: 'Dr. Liam Vance',
    hospital: 'Metropolitan General Hospital',
    storageType: 'Decentralized Encrypted IPFS (Off-chain)',
    ipfsCid: 'QmW12xPqA7s98f410293847192837491823Z4tK9eM8L33',
    encryptionKeyFingerprint: 'ed25519:7a44...01cd',
    summary: 'Clear bilateral lung fields. Cardiothoracic ratio within normal physiological limits. Costophrenic angles sharp.',
    status: 'Encrypted & Off-Chain'
  }
]

export const FEDERATED_LEARNING_METRICS = [
  { round: 'Round 120', globalAccuracy: 88.2, localAccuracy: 86.4, loss: 0.342, nodes: 14 },
  { round: 'Round 125', globalAccuracy: 90.1, localAccuracy: 88.9, loss: 0.285, nodes: 16 },
  { round: 'Round 130', globalAccuracy: 92.4, localAccuracy: 91.2, loss: 0.231, nodes: 18 },
  { round: 'Round 135', globalAccuracy: 94.0, localAccuracy: 93.6, loss: 0.178, nodes: 21 },
  { round: 'Round 140', globalAccuracy: 95.8, localAccuracy: 95.1, loss: 0.134, nodes: 24 },
  { round: 'Round 142 (Current)', globalAccuracy: 96.7, localAccuracy: 96.2, loss: 0.112, nodes: 26 }
]

export interface Scheme {
  id: string
  code: string
  title: string
  description: string
  coverage: string
  eligibilityCriteria: string[]
  zkProofType: string
  status: 'Enrolling' | 'Active' | 'Reviewing'
  enrolledPatientsCount: number
}

export const MOCK_GOV_SCHEMES: Scheme[] = [
  {
    id: 'sch_cardio_2026',
    code: 'NX-GOV-CARDIO-2026',
    title: 'National Cardiovascular Prevention & Care Initiative',
    description: 'Comprehensive subsidy for outpatient cardiology diagnostics, stress testing, and telemetric monitoring.',
    coverage: '100% coverage for diagnostic imaging, $0 copay on certified provider visits',
    eligibilityCriteria: ['Annual Household Income < $65,000', 'Permanent Residency in State', 'Age > 18'],
    zkProofType: 'ZK-SNARK Income Range + Residency Credential',
    status: 'Enrolling',
    enrolledPatientsCount: 14820
  },
  {
    id: 'sch_metabolic_2026',
    code: 'NX-GOV-METABOLIC-04',
    title: 'Metabolic & Diabetic Precision Therapy Subsidy',
    description: 'Subsidized access to continuous glucose telemetry, endocrinologist consults, and nutritional medicine.',
    coverage: '85% coverage on sensor hardware + free quarterly specialist consultations',
    eligibilityCriteria: ['Verified Diagnosis of Pre-Diabetes / Type 2 Diabetes', 'Residency in Participating District'],
    zkProofType: 'ZK-ClinicalBiomarker Assertion',
    status: 'Active',
    enrolledPatientsCount: 29400
  },
  {
    id: 'sch_pulm_2026',
    code: 'NX-GOV-PULM-12',
    title: 'Clean Air & Respiratory Health Access Grant',
    description: 'Coverage for pulmonary function tests, environmental allergen assays, and inhaler therapies.',
    coverage: 'Full coverage for spirometry & chest imaging',
    eligibilityCriteria: ['High-AQI Residential Zone', 'Income < $80,000'],
    zkProofType: 'ZK-GeoResidency + Income Bound',
    status: 'Active',
    enrolledPatientsCount: 9150
  }
]
