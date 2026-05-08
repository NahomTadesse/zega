type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-page py-16 md:py-24">
        {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-5 text-base md:text-lg opacity-85 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
