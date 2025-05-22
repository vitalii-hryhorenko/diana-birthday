// App.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.less';

const IMAGES = [
    { src: '/assets/images/together/together-1.jpg' },
    { src: '/assets/images/together/together-2.jpg' },
    { src: '/assets/images/together/together-3.jpg' },
    { src: '/assets/images/together/together-4.jpg' },
    { src: '/assets/images/together/together-5.jpg' },
    { src: '/assets/images/together/together-6.jpg' },
];

const App: React.FC = () => {
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [popupImage, setPopupImage] = useState<string | null>(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [showTip, setShowTip] = useState<boolean>(true);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

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

    const nextButtonCallback = useCallback((numberOfSection: number) => {
        return (
            <div className="scroll-button-container">
                <button className="scroll-button" onClick={() => scrollToSection(numberOfSection)}>
                    See what’s next
                </button>
            </div>
        );
    }, []);

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

    useEffect(() => {
        audioRef.current = new Audio('/assets/music/song.mp3');
        audioRef.current.loop = true;

        return () => {
            audioRef.current?.pause();
        };
    }, []);

    return (
        <div className="App">
            {[...Array(5)].map((_, i) => (
                <section
                    key={i}
                    ref={(el) => void (sectionRefs.current[i] = el)}
                    className={`section section-${i + 1}`}
                >
                    <div className="section-content">
                        {i === 1 && (
                            <div>
                                <div className="text-box box">
                                    <div className="text">Три роки тому цей день був для мене звичайним весняним днем: щебетали пташки, у саду розцвітали яблуні, а в чистому небі сяяло сонце, зігріваючи повітря своїми променями. Та справжнє тепло я відчув лише тоді, коли зустрів тебе. Відтоді в моєму житті з’явилося більше світла, радості й любові. Я неймовірно вдячний, що саме так склалися обставини — і вони привели мене до тебе. Кицюнь, я неймовірно тебе кохаю. Дякую що ти в мене є.</div>
                                </div>
                            </div>
                        )}

                        {i === 2 && (
                            <>
                                <h2>
                                    <span className="icon">📷</span>
                                    Моменти разом
                                </h2>
                                <div className="gallery">
                                    {IMAGES.map((img, index) => (
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

                        {i === 4 && (
                            <>
                                <h2>Секція 5</h2>
                            </>
                        )}
                    </div>

                    {i < 4 && nextButtonCallback(i + 1)}
                </section>
            ))}

            {popupImage && (
                <div className={`popup ${!popupVisible ? 'hide' : ''}`} onClick={() => togglePopup()}>
                    <img src={popupImage} alt="Popup" />
                </div>
            )}

            <div className="music-container">
                <div className={`music-tip ${showTip && `music-tip__show`}`}>
                    <div className="music-tip__text">Alright, turn on the music and let's see what's going on here</div>
                    <img className="music-tip__arrow" src="/assets/images/arrows/arrow-1.png"/>
                </div>
                <button
                    className="music-button"
                    onClick={ () => {
                        setShowTip(false);
                        if (audioRef.current) {
                            if (isPlaying) {
                                audioRef.current.pause();
                                setIsPlaying(false);
                            } else {
                                audioRef.current.play();
                                setIsPlaying(true);
                            }
                        }
                    } }
                >
                    { isPlaying ? '🔇' : '🎵' }
                </button>
            </div>
        </div>
    );
};

export default App;
