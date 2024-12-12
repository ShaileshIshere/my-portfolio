import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main>
      <Spline
        style={{ width: '100%', height: '20%' }}
        scene="https://prod.spline.design/6zMpkYXxVsnwsUCo/scene.splinecode" 
        // width={1920}
        // height={1080}
      />
    </main>
  );
}
