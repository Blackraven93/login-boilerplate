export default async function Home() {
  /**
   * 1. 로그인 여부를 확인하여 로그인 되어 있으면 홈페이지, 그렇지 않으면 로그인 페이지로
   * 2. 로그인이 완료되었으면 해당 메인 페이지에 데이터베이스에 존재하는 모든 컨텐츠 확인
   * 3. 컨텐츠 작성 가능
   */
  const res = await fetch("http://localhost:3003/api");
  const {
    data: { name, age },
  } = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{name}</h1>
    </main>
  );
}
