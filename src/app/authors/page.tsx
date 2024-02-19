import Card from "@/comps/Card";

export default function Authors() {
  return (
    <div>
      <h1>Authors</h1>
      <br />
      <div className="flex flex-wrap gap-4">
        <Card
          title="Zavaar Shah"
          description="I'm a student at Wayne State University. I am currently studying Computer Science in my third-year. I am passionate about software development and always looking to learn new things."
          image="https://showcase.zavaar.net/pics/me_3_prof_bg_2.jpg"
        />
        <Card
          title="Susmita Ghosh"
          description="Hello, I'm Susmita, a third-year Computer Science student with a Statistics Minor. I'm eager to be actively involved in developing and implementing key features for this project."
          image="/img/susmita.jpg"
        />
        <Card
          title="Mohammad Azadegan"
          description="I am a senior at Wayne State University, majoring in Computer Science with a minor in Statistics. I have a strong passion for engaging in software development projects. Additionally, I am currently a co-op at American Axle Manufacturing in the Data Analytics and Development Department."
          image="/img/mohammad.jpg"
        />
        <Card
          title="Nathan Race"
          description="Hi I'm Nathan, a Senior at Wayne State University studying Computer Science and Mathematics. I'm also very passionate about improving accessibility in digital design!"
          image="/img/nathan.jpg"
        />
      </div>
    </div>
  );
}
