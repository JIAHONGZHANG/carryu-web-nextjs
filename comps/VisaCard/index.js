import styled from "styled-components";
import { urlFor } from "../../utils/sanity-utils";
import { useRouter } from "next/router";
import { PostButton } from "../PostsList/PostItem";
import { Colors, PrimaryColor } from "../../styles/variables";

const CardContainer = styled.div`
  max-width: 20rem;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const CardContent = styled.div`
  padding: 1.25rem;
`;

const CardTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.2;
  color: #333;
`;

const CardText = styled.p`
  min-height: 2.6rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
`;

const CardLink = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #0077ff;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0066cc;
  }
`;

const VisaCard = ({ title, desc, asset, postRef }) => {
  const router = useRouter();

  return (
    <CardContainer>
      <CardImage
        src={urlFor(asset).width(300).height(200).url()}
        alt={`${title} image`}
      />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardText>{desc}</CardText>
        <PostButton
          onClick={(e) => {
            router.push(`/posts/${postRef}`);
          }}
          color={Colors.White}
          backgroundColor={PrimaryColor}
        >
          阅读更多
        </PostButton>
      </CardContent>
    </CardContainer>
  );
};

export default VisaCard;
