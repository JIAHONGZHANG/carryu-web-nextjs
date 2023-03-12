import { css } from "styled-components";
import { FontWeights, breakpoints } from "./variables";
// NOTE:
export const respondTo = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);
export const H2Styles = css`
  //NOTE: font family should defined at global once
  //GOOGLE: most of the html tags can inherit font family except: (Button, Input)
  font-family: inherit;
  font-weight: ${FontWeights.Bold};
  font-size: 2.5rem;
  line-height: 150%;
`;
export const H3Styles = css`
  font-family: inherit;
  font-weight: ${FontWeights.Bold};
  line-height: 150%;
  font-size: 28px;
  ${respondTo.smallTablet`
    font-size: 18px
  `}
  ${respondTo.mediumTablet`
    font-size: 26px
  `}
  ${respondTo.largeTablet`
    font-size: 34px
  `} 
  ${respondTo.desktop`
    font-size: 30px
  `};
`;

export const BodyStyles = css`
  font-family: inherit;
  /* font-size: 20px; */
  font-weight: ${FontWeights.Normal};
  line-height: 25px;
  ${respondTo.smallTablet`
    padding: 1rem
  `}
  ${respondTo.mediumTablet`
    padding: 2rem
  `}
  ${respondTo.largeTablet`
    padding: 2rem
  `} 
  ${respondTo.desktop`
    padding: 3rem
  `};
`;

export const TextStyles = css`
  ${respondTo.smallTablet`
    font-size: 11px
  `}
  ${respondTo.mediumTablet`
    font-size: 14px
  `} 
  ${respondTo.largeTablet`
    font-size: 14px
  `} 
  ${respondTo.desktop`
    font-size: 16px
  `};
`;

export const ButtonStyles = css`
  ${respondTo.smallTablet`
    font-size: 18px
  `}
  ${respondTo.mediumTablet`
    font-size: 26px
  `}
  ${respondTo.largeTablet`
    font-size: 34px
  `} 
  ${respondTo.desktop`
    font-size: 36px
  `};
`;

export const PostTextGap = css`
  gap: 10;
  ${respondTo.smallTablet`
    gap: 5px
  `}
  ${respondTo.mediumTablet`
    gap: 10px
  `}
  ${respondTo.largeTablet`
    gap: 10px
  `} 
  ${respondTo.desktop`
    gap: 10px
  `};
`;
