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
        <Card title="Author 2" description="Description 2" />
        <Card title="Author 3" description="Description 3" />
        <Card title="Author 4" description="Description 4" />
      </div>
    </div>
  );
}
