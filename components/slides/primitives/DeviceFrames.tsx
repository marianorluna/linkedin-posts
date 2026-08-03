type Props = {
  screenTitle: string;
  screenLines: string[];
};

export function DeviceScreenContent({ screenTitle, screenLines }: Props) {
  return (
    <>
      <p
        className="slot-text font-[family-name:var(--slide-font-mono)] text-[18px] tracking-[0.14em] uppercase"
        style={{ color: "var(--slide-accent)" }}
      >
        {screenTitle}
      </p>
      <ul className="mt-8 space-y-5">
        {screenLines.map((line) => (
          <li
            key={line}
            className="slot-text rounded-[14px] px-5 py-4 font-[family-name:var(--slide-font-body)] text-[22px]"
            style={{
              background: "var(--slide-accent-soft)",
              border: "1px solid var(--slide-stroke)",
              color: "var(--slide-ink)",
            }}
          >
            {line}
          </li>
        ))}
      </ul>
    </>
  );
}

export function PhoneFrame({ screenTitle, screenLines }: Props) {
  return (
    <div
      className="relative h-[760px] w-[380px] p-[18px]"
      style={{
        borderRadius: "var(--slide-radius-phone)",
        border: "var(--slide-stroke-width) solid var(--slide-stroke)",
        background: "var(--slide-bg)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="absolute left-1/2 top-[28px] h-[18px] w-[110px] -translate-x-1/2 rounded-full"
        style={{ background: "var(--slide-surface)" }}
      />
      <div
        className="flex h-full flex-col rounded-[36px] p-8 pt-16"
        style={{ background: "var(--slide-bg-elevated)" }}
      >
        <DeviceScreenContent screenTitle={screenTitle} screenLines={screenLines} />
        <div
          className="mt-auto h-[10px] w-[120px] self-center rounded-full"
          style={{ background: "var(--slide-stroke)" }}
        />
      </div>
    </div>
  );
}

export function LaptopFrame({ screenTitle, screenLines }: Props) {
  return (
    <div className="flex w-[520px] flex-col items-center">
      <div
        className="relative w-full overflow-hidden p-[14px] pt-[18px]"
        style={{
          borderRadius: "18px 18px 8px 8px",
          border: "var(--slide-stroke-width) solid var(--slide-stroke)",
          background: "var(--slide-bg)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="absolute left-1/2 top-[8px] h-[6px] w-[64px] -translate-x-1/2 rounded-full"
          style={{ background: "var(--slide-surface)" }}
        />
        <div
          className="flex min-h-[520px] flex-col rounded-[10px] p-7 pt-10"
          style={{ background: "var(--slide-bg-elevated)" }}
        >
          <DeviceScreenContent screenTitle={screenTitle} screenLines={screenLines} />
        </div>
      </div>
      <div
        className="h-[18px] w-[560px] rounded-b-[10px]"
        style={{
          background: "var(--slide-surface)",
          border: "var(--slide-stroke-width) solid var(--slide-stroke)",
          borderTop: "none",
        }}
      />
      <div
        className="h-[10px] w-[200px] rounded-b-[6px]"
        style={{ background: "var(--slide-stroke)" }}
      />
    </div>
  );
}

export function BrowserFrame({ screenTitle, screenLines }: Props) {
  return (
    <div
      className="flex w-[500px] flex-col overflow-hidden"
      style={{
        borderRadius: "16px",
        border: "var(--slide-stroke-width) solid var(--slide-stroke)",
        background: "var(--slide-bg)",
        boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="flex items-center gap-3 border-b px-5 py-4"
        style={{
          borderColor: "var(--slide-stroke)",
          background: "var(--slide-surface)",
        }}
      >
        <span className="flex gap-2" aria-hidden>
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: "var(--slide-accent-alt)" }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: "var(--slide-highlight)" }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: "var(--slide-accent)" }}
          />
        </span>
        <div
          className="ml-2 flex-1 truncate rounded-md px-3 py-1.5 font-[family-name:var(--slide-font-mono)] text-[14px] tracking-wide"
          style={{
            background: "var(--slide-bg-elevated)",
            color: "var(--slide-ink-muted)",
            border: "1px solid var(--slide-stroke)",
          }}
        >
          {screenTitle.toLowerCase().replace(/\s+/g, "-")}.dev
        </div>
      </div>
      <div
        className="flex min-h-[560px] flex-col p-8"
        style={{ background: "var(--slide-bg-elevated)" }}
      >
        <DeviceScreenContent screenTitle={screenTitle} screenLines={screenLines} />
      </div>
    </div>
  );
}
