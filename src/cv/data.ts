import type { CvData } from "./types";

export const cvData: CvData = {
	profile: {
		name: "Santiago Gaona Carvajal",
		headline:
			"Ingeniero de Sistemas e Informática | Máster en Ingeniería de Software y Sistemas Informáticos",
		summary:
			"Actualmente soy Cloud Architect en EPAM, enfocado en arquitectura e infraestructura cloud para banca regional. Desde 2018 trabajo en tecnología, combinando arquitectura cloud, infraestructura, software y prácticas DevSecOps. Diseño soluciones en AWS con gobierno cloud, seguridad, automatización, pipelines y optimización de recursos. Antes, en PwC, participé en consultoría tecnológica para Inchcape, cliente del sector automotriz.",
	},
	contact: [
		{
			label: "Ubicación",
			value: "Colombia",
		},
		{
			label: "Portafolio",
			value: "sgaonac.com",
			href: "https://sgaonac.com",
		},
		{
			label: "GitHub",
			value: "SantiagoGaonaC",
			href: "https://github.com/SantiagoGaonaC",
		},
		{
			label: "LinkedIn",
			value: "linkedin.com/in/santiago-gaona-carvajal",
			href: "https://www.linkedin.com/in/santiago-gaona-carvajal/",
		},
	],
	experience: [
		{
			company: "EPAM Neoris",
			role: "Arquitecto de Nube",
			period: "octubre de 2024 a actualidad",
			highlights: [
				"Diseño arquitectura, gobierno, seguridad y evolución multinube para plataformas bancarias regionales.",
				"Guío decisiones de plataforma en AWS y Azure, con foco en automatización, confiabilidad y entrega segura.",
				"Consolido módulos reutilizables, canalizaciones CI/CD y prácticas de operación para entornos de nube críticos.",
			],
			tech: ["AWS", "Azure", "Terraform", "EKS", "CI/CD", "Gobierno de Nube"],
		},
		{
			company: "Habitanto",
			role: "Desarrollador de software",
			period: "enero de 2024 a octubre de 2024",
			highlights: [
				"Desarrollé funcionalidades de software de punta a punta para producto de startup usando AWS, patrones orientados a eventos y prácticas DevOps.",
				"Entregué capacidades web y móviles con Next.js, Flutter, PostgreSQL, MongoDB, Docker e infraestructura en la nube.",
			],
			tech: ["Next.js", "Flutter", "AWS", "PostgreSQL", "MongoDB", "Docker"],
		},
		{
			company: "PwC Colombia",
			role: "Consultor de Tecnología",
			period: "noviembre de 2022 a agosto de 2023",
			highlights: [
				"Analicé requerimientos e implementé soluciones de automatización con RPA/IPA, Azure DevOps, SQL, .NET y PowerApps.",
				"Apoyé pruebas, validación, habilitación de usuarios e integración para iniciativas de automatización.",
			],
			tech: [".NET", "SQL", "Azure DevOps", "RPA/IPA", "PowerApps"],
		},
		{
			company: "Decathlon Colombia",
			role: "Servicios IT & Asesor",
			period: "marzo de 2022 a noviembre de 2022",
			highlights: [
				"Mantuve operativos dispositivos y plataformas tecnológicas de facturación en Decathlon Bucaramanga, apoyando la continuidad del negocio.",
				"Administré bases de datos SQL y NoSQL para sistemas de información y brindé asesoría comercial a proveedores, clientes y empleados.",
			],
			tech: [
				".NET",
				"Linux",
				"Docker",
				"Kubernetes",
				"AWS",
				"POS",
				"ERP",
				"CRM",
			],
		},
	],
	knowledge: [
		{
			group: "Nube y DevOps",
			items: [
				"AWS",
				"Azure",
				"Terraform",
				"CloudFormation",
				"Kubernetes",
				"EKS",
				"Docker",
				"CI/CD",
			],
		},
		{
			group: "Ingeniería de Software",
			items: [
				"TypeScript",
				"Node.js",
				"Go",
				".NET",
				"Python",
				"REST",
				"SOAP",
				"Microservicios",
			],
		},
		{
			group: "Datos y Plataformas",
			items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "QuickSight", "Linux"],
		},
		{
			group: "Agentes de IA",
			items: [
				"flujos agénticos",
				"herramientas LLM",
				"diseño de automatización",
				"entrega asistida por IA",
			],
		},
	],
	education: [
		{
			degree: "Máster en Ingeniería de Software y Sistemas Informáticos",
			institution: "UNIR - Universidad Internacional de La Rioja",
		},
		{
			degree: "Ingeniería de Sistemas e Informática",
			institution: "Universidad Pontificia Bolivariana",
		},
	],
	projects: [
		{
			name: "CapyFile",
			description:
				"Sistema distribuido y multiplataforma de almacenamiento con microservicios, Kubernetes, Terraform, React, .NET, Go y Flutter.",
			link: "https://github.com/hawks-atlanta",
			tech: ["Kubernetes", "Terraform", "React", ".NET", "Go", "Flutter"],
		},
		{
			name: "Gentle AI",
			description:
				"Me gusta mantener y contribuir a proyectos open source, especialmente herramientas para trabajo asistido por IA.",
			link: "https://github.com/Gentleman-Programming/gentle-ai",
			tech: ["Open Source", "AI Agents", "Automation"],
		},
	],
	certifications: [
		{
			name: "Oracle Cloud Infrastructure 2023",
			issuer: "Oracle",
			year: "2023",
			href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=69766C43C094CD2FD8C8CB5BFC387CF97FF11915964ACF02AAA2D2B4E3BE4A8C",
		},
		{
			name: "UiPath",
			credentials: [
				{ name: "Developer Foundation" },
				{ name: "Developer Advanced" },
			],
		},
		{
			name: "MinTIC",
			credentials: [
				{
					name: "Programación en Python",
					href: "https://www.sgaonac.com/python.pdf",
				},
				{
					name: "Programación en Java",
					href: "https://www.sgaonac.com/java.pdf",
				},
				{
					name: "Desarrollo de Aplicaciones Web",
					href: "https://www.santiagogaona.dev/MincTic-General.pdf",
				},
			],
		},
		{
			name: "Certificaciones y badges de MongoDB",
			issuer: "Credly",
			href: "https://www.credly.com/users/santiago-gaona/badges/credly",
		},
	],
	interests: [
		"Arquitectura de nube",
		"Ingeniería de plataformas",
		"Agentes de IA",
		"Open source",
	],
};
