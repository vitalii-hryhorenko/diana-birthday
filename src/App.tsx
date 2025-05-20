// App.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.less';

const App: React.FC = () => {
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [popupImage, setPopupImage] = useState<string | null>(null);
    const [popupVisible, setPopupVisible] = useState(false);

    const scrollToSection = (index: number) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

    const togglePopup = (image?: string) => {
        if (image) {
            setPopupImage(image);
            setPopupVisible(true);
        } else {
            setPopupVisible(false);
            setTimeout(() => setPopupImage(null), 300);
        }
    };

    const images = [
        { src: '/assets/images/together-1.jpg' },
        { src: '/assets/images/together-2.jpg' },
        { src: '/assets/images/together-3.jpg' },
        { src: '/assets/images/together-4.jpg' },
        { src: '/assets/images/together-5.jpg' },
        { src: '/assets/images/together-6.jpg' },
    ];

    useEffect(() => {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 80; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.setProperty('--i', Math.random().toString());
            confettiContainer.appendChild(confetti);
        }

        setTimeout(() => {
            confettiContainer.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(confettiContainer);
            }, 1000);
        }, 4000);
    }, []);

    const nextButtonCallback = useCallback((numberOfSection: number) => {
        return <button className="scroll-button" onClick={ () => scrollToSection(numberOfSection) }>
            Давай далі ⬇️
        </button>;
    }, []);

    return (
        <div className="App">
            { [...Array(5)].map((_, i) => (
                <section
                    key={ i }
                    ref={ (el) => void (sectionRefs.current[i] = el) }
                    className={`section section-${i + 1}`}
                >
                    {i === 0 && (
                        <>
                            <h2>
                                <span role="img" aria-label="sparkles">🎉</span>
                                Кицюня, З Днем Народження!
                                <span role="img" aria-label="sparkles">🎉</span>
                            </h2>
                            { nextButtonCallback(i + 1) }
                        </>
                    )}

                    { i === 1 && (
                        <>
                            <h2>Секція 2</h2>
                            { nextButtonCallback(i + 1) }
                        </>
                    ) }

                    {i === 2 && (
                        <>
                            <h2>
                                <span className="icon">📷</span>
                                Моменти разом
                            </h2>
                            <div className="gallery">
                                {images.map((img, index) => (
                                    <div className="thumb" key={index} onClick={() => togglePopup(img.src)}>
                                        <img src={img.src} alt={`Момент ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                            { nextButtonCallback(i + 1) }
                        </>
                    )}

                    {i === 3 && (
                        <>
                            <h2>А це твій подарунок</h2>
                            <button className="gift-button" onClick={() => togglePopup('/assets/images/gift.jpg')}>
                                Подивитися що там 🎁
                            </button>
                            { nextButtonCallback(i + 1) }
                        </>
                    )}

                    { i === 4 && (
                        <>
                            <h2>Секція 5</h2>
                        </>
                    ) }
                </section>
            ))}

            {popupImage && (
                <div className={`popup ${!popupVisible ? 'hide' : ''}`} onClick={() => togglePopup()}>
                    <img src={popupImage} alt="Popup" />
                </div>
            )}
        </div>
    );
};

export default App;