import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";

const ThemeButton: FC<{ className?: string; id: string }> = ({
  className,
  id,
}) => {
  const { theme, setTheme } = useTheme();

  // because we can't know the theme on the server side,
  // so render theme based UI on the client side only.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // render a skeleton to avoid layout shift
    return <div className="h-6 w-6"></div>;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
    >
      <svg
        viewBox="0 0 100 100"
        width={24}
        height={24}
        fill="currentColor"
        style={{ transform: `rotate(${isDark ? 30 : 0}deg)` }}
        className="transition-transform duration-500"
      >
        <mask id={id}>
          <rect x={0} y={0} width={100} height={100} fill="#fff"></rect>
          <circle
            cx={20}
            cy={44}
            r={isDark ? 36 : 0}
            fill="#000"
            className="transition-all"
          />
        </mask>
        <circle
          cx={50}
          cy={50}
          r={isDark ? 32 : 24}
          mask={`url(#${id})`}
          className="transition-all"
        />

        {Array.from({ length: 8 }).map((_, i) => {
          return (
            <polygon
              key={i}
              points="42,50 58,50 50,36.1"
              style={{
                transform: `
                    rotate(${45 * i}deg)
                    translateY(-28px) 
                    scale(${isDark ? 0 : 1})`,
                transformOrigin: "center",
              }}
              fill="currentColor"
              className="transition-all"
            />
          );
        })}
      </svg>
    </button>
  );
};

export default ThemeButton;
