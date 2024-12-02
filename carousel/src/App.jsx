import Corousel from "./components/Corousel";
function App() {
  return (
    <div className="w-[65%] mx-auto mt-20">
      <Corousel
        slides={[
          "https://media.istockphoto.com/id/1458782106/photo/scenic-aerial-view-of-the-mountain-landscape-with-a-forest-and-the-crystal-blue-river-in.jpg?s=612x612&w=0&k=20&c=NXQ_OK6JtmyRRBef8Wd67UZ3scQJKySkXl1ORaActH4=",
          "https://media.istockphoto.com/id/474267374/photo/reflections-on-a-lake.jpg?s=612x612&w=0&k=20&c=cqzsN4ldAbOywiM3Bf2lDf0wAsSUgzUHs_1Q-0ncIl8=",
          "https://media.istockphoto.com/id/1432956286/photo/aerial-view-of-beautiful-orange-trees-on-the-hill-and-mountains-in-low-clouds-at-sunrise-in.jpg?s=612x612&w=0&k=20&c=f3ROTaRcd-boLtNzfznpnSkZOFcgjbnRlO63HuAYTrY=",
          "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
          "https://media.istockphoto.com/id/1389125114/photo/light-trails-on-british-countryside-road-peak-district-uk.jpg?s=612x612&w=0&k=20&c=3v38ZLbevXjHMfbz7iZMwoJvh9kfpSla8aJpwz7dEac=",
        ]}
      />
    </div>
  );
}

export default App;
