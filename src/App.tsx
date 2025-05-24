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
    const [showJoke, setShowJoke] = useState<boolean>(false);

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
            <div className="section__scroll-button-container">
                <button className="button button--scroll" onClick={ () => scrollToSection(numberOfSection) }>
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
            confetti.style.left = `${ Math.random() * 100 }%`;
            confetti.style.animationDelay = `${ Math.random() * 2 }s`;
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
            { [...Array(9)].map((_, i) => (
                <section
                    key={ i }
                    ref={ (el) => void (sectionRefs.current[i] = el) }
                    className={ `section section-${ i + 1 }` }
                >
                    <div className="section__content">
                        { i === 0 && (
                            <img
                                src="/assets/images/background/background-1.png"
                                alt="Background"
                                className="section-1__background"
                            />
                        ) }
                        { i === 1 && (
                            <>
                                <div className="box text-box">
                                    <div className="text-box__text">
                                        Три роки тому цей день був для мене звичайним весняним днем: щебетали пташки, у
                                        саду
                                        розцвітали яблуні, а в чистому небі сяяло сонце, зігріваючи повітря своїми
                                        променями.
                                    </div>
                                </div>
                            </>
                        ) }

                        { i === 2 && (
                            <>
                                <div className="box text-box">
                                    <div className="text-box__text">
                                        Та справжнє тепло я відчув лише тоді, коли зустрів тебе. Відтоді в
                                        моєму житті з’явилося більше світла, радості й любові.
                                        Я неймовірно вдячний, що саме так склалися обставини — і вони привели мене до
                                        тебе.
                                    </div>
                                </div>
                                <div className="image-wrapper">
                                    <img
                                        src="/assets/images/diana/diana-1.jpg"
                                        alt="Теплі спогади"
                                        className="image-section"
                                    />
                                </div>
                            </>
                        ) }

                        { i === 3 && (
                            <>
                                <div className="box text-box">
                                    <div className="text-box__text">
                                        Я ще ніколи не зустрічав таких світлих і життєрадісних людей, як ти.
                                        Людей, чий внутрішній світ переливається всіма барвами так яскраво, що навіть
                                        сонце здається тьмяним.
                                    </div>
                                </div>
                                <div className="image-wrapper">
                                    <img
                                        src="/assets/images/diana/diana-2.jpg"
                                        alt="Теплі спогади"
                                        className="image-section"
                                    />
                                </div>
                            </>
                        ) }

                        { i === 4 && (
                            <>
                                <div className="box text-box">
                                    <div className="text-box__text">
                                        Впевнений, що жодні труднощі, з якими ти стикаєшся, не здатні затьмарити те
                                        світло і тепло, яке ти випромінюєш.
                                    </div>
                                </div>
                                <div className="image-wrapper">
                                    <img
                                        src="/assets/images/diana/diana-3.jpg"
                                        alt="Теплі спогади"
                                        className="image-section"
                                    />
                                </div>
                            </>
                        ) }

                        { i === 5 && (
                            <>
                                <div className="box text-box">
                                    <div className="text-box__text">
                                        Сьогодні особливий день - твій день народження.
                                        Це той момент, коли бажання набувають особливої сили й здатні здійснитися навіть
                                        тоді, коли здається неможливо.
                                        І я тобі бажаю завжди вірити в себе, ніколи не зупинятися і слухати своє серце.
                                        А я, як і завжди, буду поруч — підтримувати, надихати та підтримувати будь-які
                                        твої скажені ідеї.
                                    </div>
                                </div>
                                <div className="image-wrapper">
                                    <img
                                        src="/assets/images/diana/diana-4.jpg"
                                        alt="Теплі спогади"
                                        className="image-section"
                                    />
                                </div>
                            </>
                        ) }

                        { i === 6 && (
                            <>
                                <h2 className="section__title">
                                    <span className="icon">📷</span> Моменти разом
                                </h2>
                                <div className="gallery">
                                    { IMAGES.map((img, index) => (
                                        <div className="gallery__thumb" key={ index }
                                             onClick={ () => togglePopup(img.src) }>
                                            <img src={ img.src } alt={ `Момент ${ index + 1 }` }/>
                                        </div>
                                    )) }
                                </div>
                            </>
                        ) }

                        { i === 7 && (
                            <>
                                <div className="box text-box">
                                    <div className="text-box__text">
                                        Кицюнь, я неймовірно тебе кохаю. <br/> Дякую що ти в мене є. <br/> З Днем
                                        Народження!
                                    </div>
                                </div>
                            </>
                        ) }

                        { i === 8 && (
                            <>
                                <h2 className="section__title">{ showJoke ? 'Ой, випадково не ту фотку завантажив' : 'А це твій подарунок' }</h2>
                                <button className="button button--gift"
                                        onClick={ () => {
                                            togglePopup('/assets/images/edik/edik-1.jpg');
                                            setTimeout(() => {
                                                setShowJoke(true);
                                            }, 500);
                                        } }>
                                    Peek inside 🎁
                                </button>
                            </>
                        ) }
                    </div>

                    { i < 8 && nextButtonCallback(i + 1) }
                </section>
            )) }

            { popupImage && (
                <div className={ `popup ${ !popupVisible ? 'popup--hide' : '' }` } onClick={ () => togglePopup() }>
                    <img src={ popupImage } alt="Popup"/>
                </div>
            ) }

            <div className="music">
                <div className={ `music__tip ${ showTip ? 'music__tip--show' : '' }` }>
                    <div className="music__tip-text">Вмикай музику і давай подивимося, що тут відбувається</div>
                    <img className="music__tip-arrow" src="/assets/images/arrows/arrow-1.png"/>
                </div>
                <button
                    className="music__button"
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