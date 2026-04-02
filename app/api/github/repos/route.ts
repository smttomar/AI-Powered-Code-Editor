// import { auth } from "@/auth";

// export async function GET() {
//     const session = await auth();

//     if (!session?.accessToken) {
//         return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const res = await fetch("https://api.github.com/user/repos", {
//         headers: {
//             Authorization: `Bearer ${session.accessToken}`,
//         },
//     });

//     const data = await res.json();

//     return Response.json({ repos: data });
// }
