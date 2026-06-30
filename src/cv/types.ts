export interface CvProfile {
	name: string;
	headline: string;
	summary: string;
}

export interface CvContactItem {
	label: string;
	value: string;
	href?: string;
}

export interface CvExperienceItem {
	company: string;
	role: string;
	period: string;
	highlights: string[];
	tech?: string[];
}

export interface CvKnowledgeGroup {
	group: string;
	items: string[];
}

export interface CvEducationItem {
	degree: string;
	institution: string;
	period?: string;
}

export interface CvProjectItem {
	name: string;
	description: string;
	link?: string;
	tech?: string[];
}

export interface CvCertificationCredential {
	name: string;
	year?: string;
	href?: string;
}

export interface CvCertificationItem {
	name: string;
	issuer?: string;
	year?: string;
	href?: string;
	credentials?: CvCertificationCredential[];
}

export interface CvData {
	profile: CvProfile;
	contact: CvContactItem[];
	experience: CvExperienceItem[];
	knowledge: CvKnowledgeGroup[];
	education: CvEducationItem[];
	projects: CvProjectItem[];
	certifications: CvCertificationItem[];
	interests: string[];
}
