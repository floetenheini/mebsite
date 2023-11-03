type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3000 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Second() {
  const posts = await getPosts();

  return (
    <main>
      {posts.map((post) => (
        <div className="border border-red-600" key={post.id}>
          {post.id}
        </div>
      ))}
    </main>
  );
}
