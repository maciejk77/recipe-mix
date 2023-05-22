import Layout from "src/components/layout";

export default function Home() {
  return (
    <Layout
      main={
        <div className="text-black m-2">
          <p>Home content here, login in/out</p>
        </div>
      }
    />
  );
}
