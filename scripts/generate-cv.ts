import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { jsPDF } from "jspdf";
import { cvData } from "../src/cv/data";
import type { CvCertificationItem } from "../src/cv/types";

type PdfColor = [number, number, number];
type FontStyle = "normal" | "semibold" | "bold";

type TextStyle = {
	fontSize: number;
	lineHeight: number;
	fontStyle?: FontStyle;
	color?: PdfColor;
};

type TextBlock = {
	lines: string[];
	height: number;
	style: Required<TextStyle>;
};

type FlowRect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/cv.pdf");
const fontDir = resolve(__dirname, "cv-assets/fonts/inter");
const fontName = "Inter";

const colors = {
	black: [17, 24, 39] as PdfColor,
	muted: [70, 82, 101] as PdfColor,
	subtle: [102, 112, 133] as PdfColor,
	blue: [28, 78, 217] as PdfColor,
};

const doc = new jsPDF({
	unit: "pt",
	format: "letter",
	orientation: "portrait",
	compress: true,
});

const page = {
	width: doc.internal.pageSize.getWidth(),
	height: doc.internal.pageSize.getHeight(),
	bottom: 774,
};

const layout = {
	marginX: 34,
	headTop: 38,
	headBottom: 130,
	main: {
		x: 34,
		y: 132,
		width: 348,
		metaWidth: 70,
		metaGap: 11,
	},
	side: {
		x: 414,
		y: 109,
		width: 164,
	},
};

const contactToSideSectionGap = 9;
const contactHeaderLineClearance = 15;
const experienceHeadingBottomMargin = 6;
const experienceItemGap = 10.4;

const spacing = {
	contactValueGap: 4,
	contactLineGap: 2.5,
	inlinePeriodGap: 4,
	inlinePeriodMinWidth: 42,
	sectionTitleGap: 3,
	sideEntryTitleGap: 2,
	sideEntryBottomGap: 4,
	linkHitboxTopOffset: 8,
	linkHitboxBottomPad: 4,
};

const styles = {
	name: {
		fontSize: 28,
		lineHeight: 33,
		fontStyle: "bold",
		color: colors.blue,
	},
	headline: {
		fontSize: 10.2,
		lineHeight: 13,
		fontStyle: "bold",
		color: colors.muted,
	},
	contactLabel: {
		fontSize: 9.4,
		lineHeight: 12,
		fontStyle: "semibold",
		color: colors.muted,
	},
	contactValue: {
		fontSize: 9.4,
		lineHeight: 12,
		fontStyle: "normal",
		color: colors.muted,
	},
	section: {
		fontSize: 10.2,
		lineHeight: 13,
		fontStyle: "bold",
		color: colors.blue,
	},
	summary: {
		fontSize: 9.4,
		lineHeight: 12.6,
		fontStyle: "normal",
		color: colors.muted,
	},
	role: {
		fontSize: 9.3,
		lineHeight: 11.3,
		fontStyle: "semibold",
		color: colors.black,
	},
	meta: {
		fontSize: 8.2,
		lineHeight: 10.2,
		fontStyle: "normal",
		color: colors.subtle,
	},
	bodyTitle: {
		fontSize: 9.3,
		lineHeight: 11.5,
		fontStyle: "semibold",
		color: colors.black,
	},
	body: {
		fontSize: 8.9,
		lineHeight: 11.2,
		fontStyle: "normal",
		color: colors.muted,
	},
	stack: {
		fontSize: 8.1,
		lineHeight: 10.1,
		fontStyle: "normal",
		color: colors.subtle,
	},
	sideTitle: {
		fontSize: 8.9,
		lineHeight: 10.8,
		fontStyle: "semibold",
		color: colors.black,
	},
	sideBody: {
		fontSize: 8.3,
		lineHeight: 10.3,
		fontStyle: "normal",
		color: colors.muted,
	},
	experienceSection: {
		fontSize: 11.4,
		lineHeight: 13.9,
		fontStyle: "bold",
		color: colors.blue,
	},
	experienceRole: {
		fontSize: 10.2,
		lineHeight: 12.2,
		fontStyle: "semibold",
		color: colors.black,
	},
	experienceMeta: {
		fontSize: 8.7,
		lineHeight: 10.7,
		fontStyle: "normal",
		color: colors.subtle,
	},
	experienceBodyTitle: {
		fontSize: 10.1,
		lineHeight: 12.1,
		fontStyle: "semibold",
		color: colors.black,
	},
	experienceBody: {
		fontSize: 9.45,
		lineHeight: 11.75,
		fontStyle: "normal",
		color: colors.muted,
	},
	experienceStack: {
		fontSize: 8.45,
		lineHeight: 10.45,
		fontStyle: "normal",
		color: colors.subtle,
	},
} satisfies Record<string, TextStyle>;

function registerFonts() {
	const fonts = [
		{ file: "Inter-Regular.ttf", style: "normal" },
		{ file: "Inter-SemiBold.ttf", style: "semibold" },
		{ file: "Inter-Bold.ttf", style: "bold" },
	] as const;

	for (const font of fonts) {
		const content = readFileSync(resolve(fontDir, font.file)).toString(
			"base64",
		);
		doc.addFileToVFS(font.file, content);
		doc.addFont(font.file, fontName, font.style);
	}

	doc.setFont(fontName, "normal");
	const registeredFonts = doc.getFontList();
	if (!registeredFonts[fontName]) {
		throw new Error("Inter font registration failed for CV generation");
	}
	if (page.width !== 612 || page.height !== 792) {
		throw new Error(
			`Expected US Letter page size 612x792pt, got ${page.width}x${page.height}`,
		);
	}
}

function setColor(color: PdfColor) {
	doc.setTextColor(color[0], color[1], color[2]);
}

function useStyle(style: Required<TextStyle>) {
	doc.setFont(fontName, style.fontStyle);
	doc.setFontSize(style.fontSize);
	setColor(style.color);
}

function normalizeStyle(style: TextStyle): Required<TextStyle> {
	return {
		fontSize: style.fontSize,
		lineHeight: style.lineHeight,
		fontStyle: style.fontStyle ?? "normal",
		color: style.color ?? colors.muted,
	};
}

function measureText(text: string, width: number, style: TextStyle): TextBlock {
	const normalized = normalizeStyle(style);
	useStyle(normalized);
	const lines = doc.splitTextToSize(text, width) as string[];
	return {
		lines,
		height: Math.max(
			normalized.lineHeight,
			lines.length * normalized.lineHeight,
		),
		style: normalized,
	};
}

function drawTextBlock(block: TextBlock, x: number, y: number) {
	useStyle(block.style);
	doc.text(block.lines, x, y);
	return y + block.height;
}

function addLink(x: number, y: number, width: number, height: number, url: string) {
	(doc as unknown as { link: typeof doc.link }).link(x, y, width, height, {
		url,
	});
}

function drawDisplayName(text: string, x: number, y: number) {
	const style = normalizeStyle(styles.name);
	useStyle(style);
	doc.text(text, x, y, { charSpace: -0.35 });
	doc.text(text, x + 0.22, y, { charSpace: -0.35 });
	return y + style.lineHeight;
}

function assertFits(section: string, bottomY: number) {
	if (!Number.isFinite(bottomY) || bottomY > page.bottom) {
		throw new Error(
			`CV content overflow in ${section}: y=${bottomY.toFixed(2)} exceeds ${page.bottom}`,
		);
	}
}

function assertFlowRect(section: string, rect: FlowRect) {
	assertFits(section, rect.y + rect.height);
}

function sectionTitle(
	title: string,
	x: number,
	y: number,
	width: number,
	style: TextStyle = styles.section,
) {
	const block = measureText(title.toUpperCase(), width, style);
	const nextY = drawTextBlock(block, x, y) + spacing.sectionTitleGap;
	assertFits(title, nextY);
	return nextY;
}

function drawLinkedTextBlock(
	block: TextBlock,
	x: number,
	y: number,
	width: number,
	href: string,
) {
	useStyle(block.style);
	doc.text(block.lines, x, y);
	doc.setLineWidth(0.45);
	for (const [index, line] of block.lines.entries()) {
		const lineY = y + index * block.style.lineHeight;
		doc.line(x, lineY + 1.8, x + doc.getTextWidth(line), lineY + 1.8);
	}
	addLink(
		x,
		y - spacing.linkHitboxTopOffset,
		width,
		block.height + spacing.linkHitboxBottomPad,
		href,
	);
	return y + block.height;
}

function renderContactLine(
	label: string,
	value: string,
	x: number,
	y: number,
	width: number,
	href?: string,
) {
	const labelText = `${label}:`;
	const labelStyle = normalizeStyle(styles.contactLabel);
	const valueStyle = normalizeStyle(styles.contactValue);
	useStyle(labelStyle);
	const valueX = x + doc.getTextWidth(labelText) + spacing.contactValueGap;
	const valueWidth = width - (valueX - x);
	const valueBlock = measureText(value, valueWidth, valueStyle);
	const height = Math.max(labelStyle.lineHeight, valueBlock.height);
	assertFlowRect(`contact:${label}`, { x, y, width, height });

	useStyle(labelStyle);
	doc.text(labelText, x, y);
	if (href) {
		drawLinkedTextBlock(valueBlock, valueX, y, valueWidth, href);
	} else {
		drawTextBlock(valueBlock, valueX, y);
	}

	return y + height + spacing.contactLineGap;
}

function renderHeader() {
	doc.setFillColor(255, 255, 255);
	doc.rect(0, 0, page.width, page.height, "F");

	const nameBottom = drawDisplayName(cvData.profile.name, layout.marginX, 63);

	const headlineY = nameBottom + 7;
	const headlineBlock = measureText(
		cvData.profile.headline,
		345,
		styles.headline,
	);
	drawTextBlock(headlineBlock, layout.marginX, headlineY);

	let y = layout.headTop + contactHeaderLineClearance;
	for (const item of cvData.contact) {
		y = renderContactLine(
			item.label,
			item.value,
			layout.side.x,
			y,
			layout.side.width,
			item.href,
		);
	}
	const contactBottom = y;
	const sideStartY = Math.max(
		layout.side.y,
		contactBottom + contactToSideSectionGap,
	);

	assertFits(
		"header",
		Math.max(headlineY + headlineBlock.height, sideStartY, layout.headBottom),
	);

	return sideStartY;
}

function renderPlainHighlight(
	text: string,
	x: number,
	y: number,
	width: number,
) {
	const block = measureText(text, width, styles.experienceBody);
	drawTextBlock(block, x, y);
	return y + block.height + 3.2;
}

function renderExperienceItem(
	y: number,
	company: string,
	role: string,
	period: string,
	highlights: string[],
	tech?: string[],
) {
	const metaX = layout.main.x;
	const bodyX = layout.main.x + layout.main.metaWidth + layout.main.metaGap;
	const bodyWidth =
		layout.main.width - layout.main.metaWidth - layout.main.metaGap;

	const roleBlock = measureText(
		role,
		layout.main.metaWidth,
		styles.experienceRole,
	);
	const metaHeight = roleBlock.height;

	const companyBlock = measureText(
		company,
		bodyWidth,
		styles.experienceBodyTitle,
	);
	const periodText = `— ${period}`;
	const periodBlock = measureText(periodText, bodyWidth, styles.experienceMeta);
	const periodLineWidth = doc.getTextWidth(periodText);
	useStyle(normalizeStyle(styles.experienceBodyTitle));
	const companyLineWidth = doc.getTextWidth(company);
	const periodGap = spacing.inlinePeriodGap;
	const periodInlineX = bodyX + companyLineWidth + periodGap;
	const periodInlineWidth = bodyX + bodyWidth - periodInlineX;
	const canPlacePeriodInline =
		companyBlock.lines.length === 1 &&
		periodInlineWidth >= spacing.inlinePeriodMinWidth &&
		periodLineWidth <= periodInlineWidth;
	const headingHeight = canPlacePeriodInline
		? Math.max(companyBlock.height, periodBlock.height)
		: companyBlock.height + periodBlock.height + 1;
	const highlightBlocks = highlights.map((item) =>
		measureText(item, bodyWidth, styles.experienceBody),
	);
	const stackText = tech?.length ? `Tecnologías: ${tech.join(", ")}` : "";
	const stackBlock = stackText
		? measureText(stackText, bodyWidth, styles.experienceStack)
		: undefined;
	const bodyHeight =
		headingHeight +
		4 +
		highlightBlocks.reduce((total, block) => total + block.height + 2.8, 0) +
		(stackBlock ? stackBlock.height + 1 : 0);
	const itemHeight = Math.max(metaHeight, bodyHeight);
	assertFlowRect(`experience:${company}:${role}`, {
		x: layout.main.x,
		y,
		width: layout.main.width,
		height: itemHeight,
	});

	drawTextBlock(roleBlock, metaX, y);

	let bodyY = y;
	drawTextBlock(companyBlock, bodyX, bodyY);
	if (canPlacePeriodInline) {
		drawTextBlock(periodBlock, periodInlineX, bodyY);
		bodyY += headingHeight + 4;
	} else {
		bodyY += companyBlock.height + 1;
		bodyY = drawTextBlock(periodBlock, bodyX, bodyY) + 4;
	}
	for (const item of highlights) {
		bodyY = renderPlainHighlight(item, bodyX, bodyY, bodyWidth);
	}
	if (stackBlock) {
		drawTextBlock(stackBlock, bodyX, bodyY + 1);
	}

	return y + itemHeight;
}

function renderMain() {
	let y = layout.main.y;
	const summaryBlock = measureText(
		cvData.profile.summary,
		layout.main.width,
		styles.summary,
	);
	drawTextBlock(summaryBlock, layout.main.x, y);
	y += summaryBlock.height + 14;
	assertFits("profile", y);

	y = sectionTitle(
		"Experiencia Relevante",
		layout.main.x,
		y,
		layout.main.width,
		styles.experienceSection,
	);
	y += experienceHeadingBottomMargin;
	for (const [index, item] of cvData.experience.entries()) {
		y = renderExperienceItem(
			y,
			item.company,
			item.role,
			item.period,
			item.highlights,
			item.tech,
		);
		if (index < cvData.experience.length - 1) {
			y += experienceItemGap;
		}
	}
	assertFits("experience", y);

	return y;
}

function renderSideEntry(
	title: string,
	body: string,
	x: number,
	y: number,
	width: number,
) {
	const titleBlock = measureText(title, width, styles.sideTitle);
	const bodyBlock = measureText(body, width, styles.sideBody);
	const height =
		titleBlock.height +
		bodyBlock.height +
		spacing.sideEntryTitleGap +
		spacing.sideEntryBottomGap;
	assertFlowRect(`side:${title}`, { x, y, width, height });

	let nextY = drawTextBlock(titleBlock, x, y);
	nextY = drawTextBlock(bodyBlock, x, nextY + spacing.sideEntryTitleGap);
	return nextY + spacing.sideEntryBottomGap;
}

function renderKnowledge(y: number) {
	y = sectionTitle("Conocimientos", layout.side.x, y, layout.side.width);
	for (const item of cvData.knowledge) {
		y = renderSideEntry(
			item.group,
			item.items.join(", "),
			layout.side.x,
			y,
			layout.side.width,
		);
	}
	return y + 3;
}

function renderProjects(y: number) {
	y = sectionTitle("Proyectos Personales", layout.side.x, y, layout.side.width);
	for (const project of cvData.projects) {
		const titleBlock = measureText(
			project.name,
			layout.side.width,
			styles.sideTitle,
		);
		const descriptionBlock = measureText(
			project.description,
			layout.side.width,
			styles.sideBody,
		);
		const linkBlock = project.link
			? measureText(
					project.link.replace(/^https:\/\//, ""),
					layout.side.width,
					styles.sideBody,
				)
			: undefined;
		const height =
			titleBlock.height +
			descriptionBlock.height +
			(linkBlock?.height ?? 0) +
			9;
		assertFlowRect(`project:${project.name}`, {
			x: layout.side.x,
			y,
			width: layout.side.width,
			height,
		});

		let nextY = drawTextBlock(titleBlock, layout.side.x, y);
		nextY = drawTextBlock(descriptionBlock, layout.side.x, nextY + 2);
		if (project.link && linkBlock) {
			const linkY = nextY + 1;
			drawLinkedTextBlock(
				linkBlock,
				layout.side.x,
				linkY,
				layout.side.width,
				project.link,
			);
			nextY = linkY + linkBlock.height;
		}
		y = nextY + 7;
	}
	return y + 2;
}

function renderCertification(item: CvCertificationItem, y: number) {
	if (!item.credentials?.length) {
		const body = [item.issuer, item.year, item.href ? "credencial" : undefined]
			.filter(Boolean)
			.join(", ");
		const entryY = y;
		y = renderSideEntry(item.name, body, layout.side.x, y, layout.side.width);
		if (item.href) {
			addLink(
				layout.side.x,
				entryY - spacing.linkHitboxTopOffset,
				layout.side.width,
				y - entryY + spacing.linkHitboxBottomPad,
				item.href,
			);
		}
		return y;
	}

	const titleBlock = measureText(
		item.name,
		layout.side.width,
		styles.sideTitle,
	);
	const credentialBlocks = item.credentials.map((credential) => {
		const label = [
			credential.name,
			credential.year,
			credential.href ? "credencial" : undefined,
		]
			.filter(Boolean)
			.join(" · ");
		return {
			credential,
			label,
			block: measureText(label, layout.side.width, styles.sideBody),
		};
	});
	const height =
		titleBlock.height +
		credentialBlocks.reduce(
			(total, item) => total + item.block.height + 1.5,
			0,
		) +
		5;
	assertFlowRect(`certification:${item.name}`, {
		x: layout.side.x,
		y,
		width: layout.side.width,
		height,
	});

	let nextY = drawTextBlock(titleBlock, layout.side.x, y) + 2;
	for (const credential of credentialBlocks) {
		if (credential.credential.href) {
			drawLinkedTextBlock(
				credential.block,
				layout.side.x,
				nextY,
				layout.side.width,
				credential.credential.href,
			);
		} else {
			drawTextBlock(credential.block, layout.side.x, nextY);
		}
		nextY += credential.block.height + 1.5;
	}

	return nextY + 4;
}

function renderSideSections(startY: number) {
	let y = startY;
	y = renderKnowledge(y);
	assertFits("knowledge", y);

	y = sectionTitle("Educación", layout.side.x, y + 5, layout.side.width);
	for (const item of cvData.education) {
		y = renderSideEntry(
			item.degree,
			`${item.institution}${item.period ? `, ${item.period}` : ""}`,
			layout.side.x,
			y,
			layout.side.width,
		);
	}
	assertFits("education", y);

	y = renderProjects(y + 5);
	assertFits("projects", y);

	y = sectionTitle("Certificaciones", layout.side.x, y + 3, layout.side.width);
	for (const item of cvData.certifications) {
		y = renderCertification(item, y);
	}
	assertFits("certifications", y);

	return y;
}

function setDeterministicMetadata() {
	doc.setProperties({
		title: `${cvData.profile.name} - CV`,
		subject: "Currículum vitae",
		author: cvData.profile.name,
		creator: "portfolio CV generator",
		keywords:
			"arquitectura de nube, ingeniería de software, fullstack, agentes de IA",
	});

	const metadataDoc = doc as unknown as {
		setCreationDate?: (date: Date) => void;
		setFileId?: (id: string) => void;
	};
	metadataDoc.setCreationDate?.(new Date("2026-01-01T00:00:00.000Z"));
	metadataDoc.setFileId?.("c0de0000000000000000000000002026");
}

function writePdf() {
	if (doc.getNumberOfPages() !== 1) {
		throw new Error(
			`Expected a one-page CV, got ${doc.getNumberOfPages()} pages`,
		);
	}

	mkdirSync(dirname(outputPath), { recursive: true });
	const arrayBuffer = doc.output("arraybuffer");
	writeFileSync(outputPath, Buffer.from(new Uint8Array(arrayBuffer)));
}

setDeterministicMetadata();
registerFonts();
const sideStartY = renderHeader();
renderMain();
renderSideSections(sideStartY);
writePdf();

console.log(`Generated ${outputPath}`);
