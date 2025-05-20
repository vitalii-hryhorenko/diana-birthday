// App.tsx
import React, { useRef, useState, useEffect } from 'react';
import './App.less';

const App: React.FC = () => {
    const section1Ref = useRef<HTMLElement | null>(null);
    const section2Ref = useRef<HTMLElement | null>(null);
    const section3Ref = useRef<HTMLElement | null>(null);
    const section4Ref = useRef<HTMLElement | null>(null);
    const section5Ref = useRef<HTMLElement | null>(null);

    const sectionRefs = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref];
    const [popupImage, setPopupImage] = useState<string | null>(null);
    const [popupVisible, setPopupVisible] = useState(false);

    const scrollToSection = (index: number) => {
        sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
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
            confettiContainer.appendChild(confetti);
        }

        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 4000);
    }, []);

    return (
        <div className="App">
            {[...Array(5)].map((_, i) => (
                <section
                    key={i}
                    ref={sectionRefs[i]}
                    className={`section section-${i + 1}`}
                >
                    {i === 0 && (
                        <>
                            <h2>
                                <span role="img" aria-label="sparkles">🎉</span>
                                Кицюня, З Днем Народження!
                                <span role="img" aria-label="sparkles">🎉</span>
                            </h2>
                            <button className="scroll-button" onClick={() => scrollToSection(i + 1)}>
                                Давай далі ⬇️
                            </button>
                        </>
                    )}

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
                        </>
                    )}

                    {i === 3 && (
                        <>
                            <h2>А це твій подарунок</h2>
                            <button className="gift-button" onClick={() => togglePopup('/assets/images/gift.jpg')}>
                                Подивитися що там 🎁
                            </button>
                        </>
                    )}

                    {[1, 4].includes(i) && (
                        <>
                            <h2>Секція {i + 1}</h2>
                            <button className="scroll-button" onClick={() => scrollToSection(i + 1)}>
                                Давай далі ⬇️
                            </button>
                        </>
                    )}
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
