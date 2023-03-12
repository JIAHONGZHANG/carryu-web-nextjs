import Link from "next/link";
import styled from "styled-components";

const StyledSpan = styled(Link)`
  display: inline-block;
  background-color: #ebf8ff;
  color: #1a202c;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  margin-right: 0.5rem;
  padding: 0.125rem 0.625rem;
  border-radius: 0.25rem;
  text-decoration: none;
`;

function Badge({ name, link }) {
  return <StyledSpan href={link}>{name}</StyledSpan>;
}

export default Badge;
