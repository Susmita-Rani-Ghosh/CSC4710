import Card from "@/comps/Card";

export default function Authors() {
  return (
    <div>
      <h1>Authors</h1>
      <br />
      <div className="flex flex-wrap gap-4">
        <Card
          title="Zavaar Shah"
          description="I'm a student at Wayne State University. I am currently studying Computer Science am in my third year. I am passionate about software development and always looking to learn new things."
          image="https://showcase.zavaar.net/pics/me_3_prof_bg_2.jpg"
        />
        <Card
          title="Susmita Ghosh"
          description="Hello, I'm Susmita, a third-year Computer Science student with a Statistics Minor. I'm eager to be actively involved in developing and implementing key features for this project."
          image="/img/susmita.jpg"
        />
        <Card title="Author 3" description="Description 3" />
        <Card title="Author 4" description="Description 4" />
      </div>
    </div>
  );
}
