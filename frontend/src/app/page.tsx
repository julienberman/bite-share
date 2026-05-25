export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-4 px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        project-template
      </h1>
      <p className="text-sm text-muted-foreground">
        Frontend is running. Backend health is available at <code>/health</code>{" "}
        on port 8000.
      </p>
    </main>
  );
}
