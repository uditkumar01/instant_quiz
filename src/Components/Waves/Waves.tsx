import "./Waves.css";
export function Waves() {
    return (
        <div className="waves">
            {[0, 1, 2, 3].map((num) => {
                return (
                    <>
                        <div className={`dolphin-light`}></div>
                        <div className={`dolphin-dark`}></div>
                        <div className={`wave wave-${num}`}>
                            {[1, 1].map(() => {
                                return (
                                    <>
                                        <div className="water">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 350 32"
                                                height="50"
                                                preserveAspectRatio="none"
                                            >
                                                <path d="M350,17.32V32H0V17.32C116.56,65.94,175-39.51,350,17.32Z" />
                                            </svg>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </>
                );
            })}
        </div>
    );
}
