import {
    Body2,
    Card,
    CardHeader,
    CardPreview,
    Carousel,
    CarouselAnnouncerFunction,
    CarouselCard,
    CarouselNav,
    CarouselNavButton,
    CarouselNavContainer,
    CarouselSlider,
    Image,
    makeStyles,
    Title1,
    tokens,
    typographyStyles
} from "@fluentui/react-components";
import { QRCodeSVG } from "qrcode.react";
import * as React from "react";

const useClasses = makeStyles({
    bannerCard: {
        alignContent: "center",
        borderRadius: tokens.borderRadiusLarge,
        height: "100vh",
        overflow: "hidden",
        textAlign: "left",
        position: "relative",
    },
    cardContainer: {
        position: "absolute",
        left: "10%",
        top: "25%",
        backgroundColor: `color-mix(in srgb, ${tokens.colorNeutralBackground1} 70%, transparent)`
    },
    title: {
        ...typographyStyles.title1,
    },
    subtext: {
        ...typographyStyles.body1,
    },
    container: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto 1fr",
    },
    card: {
        display: "flex",
        flexDirection: "column",

        border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
        borderRadius: tokens.borderRadiusMedium,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,

        padding: "10px",
        minHeight: "100px",
    },
    carousel: {
        flex: 1,
        padding: "20px",
    },
    controls: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",

        border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
        borderBottom: "none",
        borderRadius: tokens.borderRadiusMedium,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        padding: "10px",
    },
    field: {
        flex: 1,
        gridTemplateColumns: "minmax(100px, max-content) 1fr",
    },
    dropdown: {
        maxWidth: "max-content",
    },
});

interface IimageSrc {
    url: string;
    title?: string;
    body?: string;
    link?: string;
    style?: React.CSSProperties;
    mode: "iframe" | "image" | "image+card" | "video";
    videotype?: "video/mp4";
    end?: string;
}

const BannerCard: React.FC<{
    imageSrc: IimageSrc;
    index: number;
    count: number;
}> = (props) => {
    const { imageSrc, index, count } = props;
    const classes = useClasses();
    return (
        <CarouselCard className={classes.bannerCard} aria-label={`${index + 1} of ${count}`}>
            {(imageSrc.mode === "image" || imageSrc.mode === "image+card") && <>
                <Image style={imageSrc.style} fit="cover" src={imageSrc.url} role="presentation" />
                {imageSrc.mode === "image+card" && <Card orientation="horizontal" size="large" className={classes.cardContainer}>
                    {imageSrc.link && <CardPreview><QRCodeSVG value={imageSrc.link} /></CardPreview>}
                    <CardHeader header={<Title1>{imageSrc.title}</Title1>} description={<Body2>{imageSrc.body}</Body2>} />
                </Card>}
            </>}
            {imageSrc.mode === "video" && <video loop autoPlay>
                <source src={imageSrc.url} type={imageSrc.videotype!}></source>
            </video>}
            {imageSrc.mode === "iframe" && <iframe sandbox="allow-scripts allow-same-origin" src={imageSrc.url}></iframe>}
        </CarouselCard>
    );
};

const getAnnouncement: CarouselAnnouncerFunction = (
    index: number,
    totalSlides: number
) => {
    return `Carousel slide ${index + 1} of ${totalSlides}`;
};

export const Autoplay = () => {
    const classes = useClasses();
    const [images, setImages] = React.useState<IimageSrc[]>([]);
    
    React.useEffect(() => {
        const load: IimageSrc[] = JSON.parse(sessionStorage.getItem("slides") ?? "[]");;
        setImages(load?.filter(i => i.end === undefined || new Date(i.end) > new Date()));
        //reload after 10 mins
        setTimeout(() => window.location.reload(), 600000);
    }, []);
    
    return (
        <div className={classes.container}>
            <Carousel motion="fade" groupSize={1} circular announcement={getAnnouncement}>
                <CarouselSlider>
                    {images?.map((imageSrc, index) => (
                        <BannerCard
                            key={`image-${index}`}
                            imageSrc={imageSrc}
                            index={index}
                            count={images?.length ?? 0}
                        />
                    ))}
                </CarouselSlider>
                <CarouselNavContainer
                    layout="overlay-expanded"
                    autoplay={{ checked: true }}
                    next={{ "appearance": "secondary", "aria-label": "go to next" }}
                    prev={{ "appearance": "secondary", "aria-label": "go to prev" }}
                >
                    <CarouselNav>
                        {(index) => (
                            <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />
                        )}
                    </CarouselNav>
                </CarouselNavContainer>
            </Carousel>
        </div>
    );
};