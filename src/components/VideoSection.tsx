'use client';

import React from 'react';
import styles from './VideoSection.module.css';

interface VideoSectionProps {
    title?: string;
    subtitle?: string;
    videoUrl?: string;
    description?: string;
    isYoutube?: boolean;
}

export default function VideoSection({
    title = "Our Traditional Process",
    subtitle = "Experience Our Craft",
    videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    description = "Take a peek into the heart of Bengal where our traditional artists craft the finest Patali Gur using age-old techniques.",
    isYoutube = true
}: VideoSectionProps) {

    // Extract video ID if it's a youtube link to ensure embed format
    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com/watch?v=')) {
            const id = url.split('v=')[1].split('&')[0];
            return `https://www.youtube.com/embed/${id}`;
        }
        if (url.includes('youtu.be/')) {
            const id = url.split('youtu.be/')[1];
            return `https://www.youtube.com/embed/${id}`;
        }
        return url;
    };

    const finalUrl = isYoutube ? getEmbedUrl(videoUrl) : videoUrl;

    return (
        <section className={styles.videoSection}>
            <div className="container">
                <div className={styles.titleSection}>
                    <span className={styles.subtitle}>{subtitle}</span>
                    <h2 className={styles.title}>{title}</h2>
                </div>

                <div className={styles.videoContainer}>
                    <div className={styles.videoWrapper}>
                        {isYoutube ? (
                            <iframe
                                src={finalUrl}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video controls>
                                <source src={finalUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </div>

                <div className={styles.details}>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
        </section>
    );
}
