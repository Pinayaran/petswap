interface FeaturePlaceholderScreenProps {
  readonly feature: string;
  readonly requirement: string;
}

export function FeaturePlaceholderScreen({ feature, requirement }: FeaturePlaceholderScreenProps) {
  return (
    <main className="placeholder-screen">
      <p className="eyebrow">Don't Like My Pets</p>
      <h1>{feature}</h1>
      <p>Foundation route for {requirement}. Build the approved VibeCode design here.</p>
    </main>
  );
}
