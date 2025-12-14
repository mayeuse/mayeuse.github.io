const presentations = [
  "2026 Florida Undergraduate Research Association Posters at the Capitol",
  "2025 MIT Summer Research Program (MSRP)",
  "2025 MSRP Student Reflection Speech",
  "2025 MSRP Media Lab Intern Showcase",
  "2025 UCF Student Scholar Symposium",
  "2025 UCF Impact of Research Competition",
  "2024 MIT Summer Research Program (MSRP)",
  "2024 MSRP Highlight Reel",
  "2024 MSRP Media Lab Intern Showcase",
];

const PresentationsSection = () => {
  return (
    <section id="presentations" className="min-h-screen flex items-center justify-end pr-[10%]">
      <ul className="flex flex-col gap-4 items-end">
        {presentations.map((presentation, index) => (
          <li key={index}>
            <span className="font-nav text-base md:text-lg uppercase tracking-wide text-foreground">
              {presentation}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PresentationsSection;
