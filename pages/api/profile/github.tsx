import GithubProfile from "components/profile/GithubProfile";
import { gql, User } from "lib/profile/github";
import fetchBase64 from "lib/utils/fetchBase64";
import { NextApiHandler } from "next";
import { renderToString } from "react-dom/server";

const profile: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  const username = req.query.username as string;

  const response = await gql(`
  query{
    user(login: "${username}"){
      name
      bio
      avatarUrl
      repositories(privacy:PUBLIC, first:100, isFork:false){
        nodes{
          name
          languages(first:100, orderBy: {field:SIZE, direction:DESC}){
            edges{
              size
              node{
                name
              }
            }
          }
        }
      }
    }
  }
`);

  if (response.ok) {
    const data = (await response.json()) as { data: { user: User } };
    const user = data.data.user;
    const avatarUrl = await fetchBase64(user.avatarUrl);

    const langDict: Record<string, number> = user.repositories.nodes.reduce(
      (dict, repository) => {
        repository.languages.edges.forEach((edge) => {
          const lang = edge.node.name;
          if (dict[lang]) {
            dict[lang] += edge.size;
          } else {
            dict[lang] = edge.size;
          }
        });
        return dict;
      },
      {}
    );

    return res
      .status(200)
      .setHeader("Content-Type", "image/svg+xml")
      .end(
        renderToString(
          <GithubProfile
            avatarUrl={avatarUrl}
            langDict={langDict}
            name={user.name}
            bio={user.bio}
          />
        )
      );
  }

  return res.status(500).json({ message: "Internal server error" });
};

export default profile;
