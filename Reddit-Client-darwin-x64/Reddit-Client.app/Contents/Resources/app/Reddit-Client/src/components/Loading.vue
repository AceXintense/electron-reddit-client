<template>
    <div class="loader">

    </div>
</template>

<style>
    .loader {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        margin-top: -10vh;
        margin-left: -10vh;
        -webkit-perspective: 60vh;
        perspective: 60vh;
    }
    .loader:before,
    .loader:after {
        content: " ";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .loader:before {
        left: -13.333333333333334vh;
        background: -webkit-linear-gradient(315deg, #fccf31, rgba(245,85,85,0.95));
        background: linear-gradient(135deg, #fccf31, rgba(245,85,85,0.95));
        -webkit-transform: translateZ(0vh);
        transform: translateZ(0vh);
        z-index: 1;
        -webkit-animation: rotation1 1.5s ease-out infinite;
        animation: rotation1 1.5s ease-out infinite;
    }
    .loader:after {
        right: -13.333333333333334vh;
        background: -webkit-linear-gradient(315deg, #e2b0ff, rgba(159,68,211,0.95));
        background: linear-gradient(135deg, #e2b0ff, rgba(159,68,211,0.95));
        -webkit-transform: translateZ(0vh);
        transform: translateZ(0vh);
        z-index: 1;
        -webkit-animation: rotation2 1.5s ease-out infinite;
        animation: rotation2 1.5s ease-out infinite;
    }
    @-webkit-keyframes rotation1 {
        25% {
            left: 0;
            -webkit-transform: translateZ(-10vh);
            transform: translateZ(-10vh);
        }
        50% {
            left: 13.333333333333334vh;
            -webkit-transform: translateZ(0vh);
            transform: translateZ(0vh);
        }
        75% {
            left: 0;
            -webkit-transform: translateZ(20vh);
            transform: translateZ(20vh);
            z-index: 2;
        }
    }
    @keyframes rotation1 {
        25% {
            left: 0;
            -webkit-transform: translateZ(-10vh);
            transform: translateZ(-10vh);
        }
        50% {
            left: 13.333333333333334vh;
            -webkit-transform: translateZ(0vh);
            transform: translateZ(0vh);
        }
        75% {
            left: 0;
            -webkit-transform: translateZ(20vh);
            transform: translateZ(20vh);
            z-index: 2;
        }
    }
    @-webkit-keyframes rotation2 {
        25% {
            right: 0;
            -webkit-transform: translateZ(20vh);
            transform: translateZ(20vh);
            z-index: 2;
        }
        50% {
            right: 13.333333333333334vh;
            -webkit-transform: translateZ(0vh);
            transform: translateZ(0vh);
        }
        75% {
            right: 0;
            -webkit-transform: translateZ(-10vh);
            transform: translateZ(-10vh);
        }
    }
    @keyframes rotation2 {
        25% {
            right: 0;
            -webkit-transform: translateZ(20vh);
            transform: translateZ(20vh);
            z-index: 2;
        }
        50% {
            right: 13.333333333333334vh;
            -webkit-transform: translateZ(0vh);
            transform: translateZ(0vh);
        }
        75% {
            right: 0;
            -webkit-transform: translateZ(-10vh);
            transform: translateZ(-10vh);
        }
    }
</style>