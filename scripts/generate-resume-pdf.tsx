// Build-time script: renders RESUME_DATA (src/resumeData.ts — the same
// content ResumeModal.tsx shows on-page) into a real, downloadable
// public/resume.pdf using @react-pdf/renderer.
//
// Why a separate render instead of screenshotting the on-page modal:
// @react-pdf/renderer builds an actual PDF text layer (not an image), so
// the output is selectable, searchable, and parseable by the ATS software
// recruiters actually run resumes through — a screenshot/print-to-image
// wouldn't be. It runs here as a Node script (no headless browser needed),
// which keeps it fast and reliable in Netlify's build environment.
//
// Runs automatically via package.json's "prebuild" script, before every
// `npm run build` — so the PDF can never drift out of sync with the data
// file, and there's nothing to remember to regenerate by hand.
import React from 'react';
import { Document, Page, Text, View, Link, StyleSheet, renderToFile } from '@react-pdf/renderer';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { RESUME_DATA } from '../src/resumeData';

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 46,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#18181b',
  },
  header: {
    textAlign: 'center',
    borderBottom: '1pt solid #d4d4d8',
    paddingBottom: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 9.5,
    color: '#1d4ed8',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 5,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 6,
    fontSize: 8,
    color: '#52525b',
  },
  contactItem: {
    marginHorizontal: 8,
  },
  link: {
    color: '#52525b',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 9,
  },
  sectionHeading: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1d4ed8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderLeft: '2pt solid #1d4ed8',
    paddingLeft: 6,
    marginBottom: 5,
  },
  paragraph: {
    lineHeight: 1.35,
    color: '#3f3f46',
    textAlign: 'justify',
  },
  skillsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillsCol: {
    width: '48%',
  },
  skillRow: {
    marginBottom: 3,
    lineHeight: 1.3,
  },
  skillLabel: {
    fontFamily: 'Helvetica-Bold',
  },
  entry: {
    marginBottom: 6,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
  },
  entryMeta: {
    fontSize: 8,
    color: '#71717a',
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 1.5,
  },
  bulletDot: {
    width: 10,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.3,
    color: '#3f3f46',
  },
  twoCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    width: '48%',
  },
  credentialRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  credentialCheck: {
    width: 10,
    color: '#059669',
    fontFamily: 'Helvetica-Bold',
  },
  credentialText: {
    flex: 1,
  },
});

function SectionHeading({ children }: { children: string }) {
  return <Text style={styles.sectionHeading}>{children}</Text>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item) => (
        <View style={styles.bullet} key={item}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function ResumeDocument() {
  return (
    <Document
      title={`${RESUME_DATA.name} — Resume`}
      author={RESUME_DATA.name}
      subject={RESUME_DATA.title}
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{RESUME_DATA.name}</Text>
          <Text style={styles.title}>{RESUME_DATA.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{RESUME_DATA.location}</Text>
            <Text style={styles.contactItem}>{RESUME_DATA.phoneNote}</Text>
            <Text style={styles.contactItem}>{RESUME_DATA.email}</Text>
            <Link src={RESUME_DATA.linkedinUrl} style={[styles.contactItem, styles.link]}>
              {RESUME_DATA.linkedinDisplay}
            </Link>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <SectionHeading>Professional Summary</SectionHeading>
          <Text style={styles.paragraph}>{RESUME_DATA.summary}</Text>
        </View>

        {/* Technical Skills */}
        <View style={styles.section}>
          <SectionHeading>Technical Skills</SectionHeading>
          <View style={styles.skillsGrid}>
            <View style={styles.skillsCol}>
              {RESUME_DATA.technicalSkills.left.map((row) => (
                <Text style={styles.skillRow} key={row.label}>
                  <Text style={styles.skillLabel}>{row.label}: </Text>
                  {row.value}
                </Text>
              ))}
            </View>
            <View style={styles.skillsCol}>
              {RESUME_DATA.technicalSkills.right.map((row) => (
                <Text style={styles.skillRow} key={row.label}>
                  <Text style={styles.skillLabel}>{row.label}: </Text>
                  {row.value}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <SectionHeading>Software Engineering Projects</SectionHeading>
          {RESUME_DATA.projects.map((project) => (
            <View style={styles.entry} key={project.name} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{project.name}</Text>
                <Text style={styles.entryMeta}>{project.stack}</Text>
              </View>
              <BulletList items={project.bullets} />
            </View>
          ))}
        </View>

        {/* Work History */}
        <View style={styles.section}>
          <SectionHeading>Work History</SectionHeading>
          {RESUME_DATA.workHistory.map((job) => (
            <View style={styles.entry} key={job.title} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{job.title}</Text>
                <Text style={styles.entryMeta}>{job.dateRange} | {job.location}</Text>
              </View>
              <BulletList items={job.bullets} />
            </View>
          ))}
        </View>

        {/* Education & Credentials */}
        <View style={[styles.section, styles.twoCol]}>
          <View style={styles.col}>
            <SectionHeading>Education</SectionHeading>
            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 9.5 }}>{RESUME_DATA.education.degree}</Text>
            <Text style={{ color: '#52525b', marginTop: 2 }}>{RESUME_DATA.education.school}</Text>
            <Text style={{ color: '#71717a', fontSize: 8.5, marginTop: 2 }}>{RESUME_DATA.education.date}</Text>
          </View>
          <View style={styles.col}>
            <SectionHeading>Credentials</SectionHeading>
            {RESUME_DATA.credentials.map((credential) => (
              <View style={styles.credentialRow} key={credential}>
                <Text style={styles.credentialCheck}>✓</Text>
                <Text style={styles.credentialText}>{credential}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const outputPath = path.resolve(scriptDir, '../public/resume.pdf');
  await renderToFile(<ResumeDocument />, outputPath);
  console.log(`[generate-resume-pdf] wrote ${outputPath}`);
}

main().catch((err) => {
  console.error('[generate-resume-pdf] failed:', err);
  process.exit(1);
});
