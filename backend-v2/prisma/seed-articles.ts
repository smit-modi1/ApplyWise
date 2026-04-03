import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const articles = [
  {
    title: "10 Top UK Tier 2 Visa Sponsoring Companies in 2026",
    slug: "top-uk-tier-2-visa-sponsoring-companies-2026",
    content: "Securing a UK Visa Sponsorship is a major hurdle for international applicants. In 2026, many top-tier firms actively sponsor candidates on a Tier 2 Visa. The UK tech sector, financial institutions, and healthcare providers lead the chart. Companies like Revolut, Monzo, and major banks constantly recruit global talent. Using an automated tool to discover roles specifically highlighting 'Visa Sponsorship Available' simplifies this process.",
    published: true,
  },
  {
    title: "How to Filter for Sponsorship Jobs on LinkedIn",
    slug: "how-to-filter-for-sponsorship-jobs-linkedin",
    content: "Looking for jobs that offer sponsorship directly on LinkedIn can be tedious. Keywords are your best friend. Searching for exact phrases like 'Tier 2 Sponsorship', 'Skilled Worker Visa Sponsor', or simply 'Sponsorship Available' inside Boolean strings yields the best result. However, using automated tools like ApplyWise saves hours of manual searching by fetching direct matching roles instantly.",
    published: true,
  },
  {
    title: "The Ultimate Guide to UK Skilled Worker Visa Roles",
    slug: "ultimate-guide-uk-skilled-worker-visa-roles",
    content: "The Skilled Worker Visa has replaced the old Tier 2 (General) visa. To qualify, you need a job offer from an approved UK employer that holds a sponsorship license. We dive into the minimum salary thresholds, the 'going rate' for specific occupation codes, and how candidates can position their CVs to meet the exact criteria UK sponsors look for.",
    published: true,
  },
  {
    title: "Does Your Resume Pass the Visa Sponsor Screen?",
    slug: "resume-pass-visa-sponsor-screen",
    content: "When applying for sponsored roles, HR departments evaluate the extra cost and processing time involved. Your resume must overwhelmingly demonstrate that you have hard-to-find skills in the local market. Tailoring your CV to clearly mention your visa requirements and showcasing unique accomplishments makes it easier for recruiters to justify the sponsorship investment.",
    published: true,
  },
  {
    title: "Top 5 Industries Sponsoring Foreign Talent in the UK",
    slug: "top-5-industries-sponsoring-foreign-talent-uk",
    content: "Not all industries are created equal when it comes to sponsorship. Currently, Technology (Software Engineering, Data Science), Healthcare (Doctors, Nurses), Engineering, Finance, and Education are the top 5 sectors most willing to issue a Certificate of Sponsorship (CoS). Exploring roles within these sectors maximizes your chances of successfully landing an international offer.",
    published: true,
  },
  {
    title: "Understanding the Certificate of Sponsorship (CoS)",
    slug: "understanding-certificate-of-sponsorship-cos",
    content: "A CoS is not a paper document but a virtual document with a unique reference number issued by endless Home Office approved sponsors. It validates your job offer and is mandatory to apply for a Skilled Worker visa. There are 'Defined' and 'Undefined' CoS allocations. Knowing the difference helps you understand the hiring timeframe.",
    published: true,
  },
  {
    title: "How Startups Manage Visa Sponsorships",
    slug: "how-startups-manage-visa-sponsorships",
    content: "It's a myth that only enterprise giants can sponsor your visa. Many agile tech startups hold sponsorship licenses to access global engineering talent. While they might lack massive HR infrastructure, their process can be surprisingly fast if your skills are a direct match to their core business operations.",
    published: true,
  },
  {
    title: "Should You Mention Visa Sponsorship in Your Cover Letter?",
    slug: "mention-visa-sponsorship-cover-letter",
    content: "Transparency is critical. However, the placement of this information matters. We recommend addressing your need for UK sponsorship near the end of your cover letter, after you have thoroughly pitched your value proposition and alignment with the company's technical or strategic needs. Never make it the leading paragraph.",
    published: true,
  },
  {
    title: "Navigating the New Minimum Salary Thresholds for UK Sponsorship",
    slug: "navigating-new-minimum-salary-thresholds-uk-sponsorship",
    content: "With recent updates by the UK Home Office, the baseline salary requirements to qualify for a Skilled Worker visa have shifted. Candidates must now ensure that their prospective role meets either the general salary threshold or the specific 'going rate' for the profession, whichever is higher.",
    published: true,
  },
  {
    title: "Leveraging AI to Match With Sponsorship Ready Employers",
    slug: "leveraging-ai-match-sponsorship-ready-employers",
    content: "Instead of manually refreshing career pages, AI agents can read and interpret thousands of job posts to exclusively find companies explicitly offering sponsorship. Platforms like ApplyWise use semantic scanning to bring these high-value opportunities directly to your inbox accompanied by tailored application materials.",
    published: true,
  }
];

async function main() {
  console.log("Seeding articles...");
  
  // Create a default admin user if no users exist to bind authorId
  let admin = await prisma.user.findFirst({ where: { email: 'admin@applywise.com' } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: 'admin@applywise.com',
        firstName: 'System',
        lastName: 'Admin',
        passwordHash: 'dummy',
        isActive: true,
      }
    });
  }

  for (const article of articles) {
    const existing = await prisma.article.findUnique({ where: { slug: article.slug } });
    if (!existing) {
      await prisma.article.create({
        data: {
          ...article,
          authorId: admin.id,
        }
      });
      console.log(`Created article: ${article.title}`);
    } else {
      console.log(`Article already exists: ${article.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
