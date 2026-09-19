import React from "react";

interface ThemeToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    ariaLabel?: string;
    scale?: number;
}

export function ThemeToggleSwitch({
    checked,
    onChange,
    ariaLabel = "Ganti tema / Switch theme",
    scale = 0.85,
}: ThemeToggleSwitchProps) {
    return (
        <div
            className="inline-flex items-center justify-center select-none"
            style={{
                transform: scale !== 1 ? `scale(${scale})` : undefined,
                transformOrigin: "center center",
            }}
        >
            <label className="theme-toggle-switch" aria-label={ariaLabel}>
                <input
                    type="checkbox"
                    className="theme-toggle-input"
                    checked={checked}
                    onChange={onChange}
                    aria-label={ariaLabel}
                />
                <div className="theme-toggle-slider">
                    <div className="sun-moon">
                        {/* Moon craters */}
                        <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>

                        {/* Light rays for sun */}
                        <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>

                        {/* Clouds for daytime */}
                        <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                        <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"></circle>
                        </svg>
                    </div>

                    {/* Stars for nighttime */}
                    <div className="stars">
                        <svg id="star-1" className="star" viewBox="0 0 20 20">
                            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                        </svg>
                        <svg id="star-2" className="star" viewBox="0 0 20 20">
                            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                        </svg>
                        <svg id="star-3" className="star" viewBox="0 0 20 20">
                            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                        </svg>
                        <svg id="star-4" className="star" viewBox="0 0 20 20">
                            <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                        </svg>
                    </div>
                </div>
            </label>
        </div>
    );
}

export default ThemeToggleSwitch;
