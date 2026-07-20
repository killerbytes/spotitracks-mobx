import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from 'styled/Flex';

function List({ children }) {
  return <ListStyled>{children}</ListStyled>;
}

function ListItem({ item, position, className, actions, children }) {
  //   const { name, artists } = item;
  //   const imgUrl = item.images[0].url || item.album?.images[0].url;

  return (
    <ListItemStyled className={className}>
      {position && (
        <div>
          <span className="circle">{position}</span>
        </div>
      )}
      {children ? (
        children
      ) : (
        <></>
        // <div className="item-content">
        //   {imgUrl && <img src={imgUrl} alt={name} width={40} />}
        //   <div className="track-info">
        //     <div className="track">{name}</div>
        //     {artists
        //       ?.map((artist) => artist.name)
        //       .toString()
        //       .replace(',', ', ')}
        //   </div>
        // </div>
      )}
      {actions && actions}
    </ListItemStyled>
  );
}

function ListItemContent({ children, to, ...props }) {
  if (to) {
    return (
      <ListItemContentStyled $column $gap={(props) => props.theme.spacing.xs} as={Link} to={to} {...props}>
        {children}
      </ListItemContentStyled>
    );
  }
  return (
    <ListItemContentStyled $column $gap={(props) => props.theme.spacing.xs} as="div" {...props}>
      {children}
    </ListItemContentStyled>
  );
}

function ListItemImage({ src, alt }) {
  return <ListItemImageStyled src={src} alt={alt} />;
}

function ListItemText({ children }) {
  return <ListItemTextStyle>{children}</ListItemTextStyle>;
}

function ListItemDescription({ children }) {
  return <ListItemDescriptionStyle>{children}</ListItemDescriptionStyle>;
}

export { List, ListItem, ListItemContent, ListItemImage, ListItemText, ListItemDescription };

const ListStyled = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  flex-direction: column;
`;

const ListItemStyled = styled.li`
  padding: ${(props) => props.theme.spacing.sm};
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: #20202080;
  &.is-dupe {
    text-decoration: line-through;
    color: ${(props) => props.theme.backgroundElevated};
    opacity: 0.5;
  }
`;

const ListItemContentStyled = styled(Flex)`
  color: ${(props) => (props.to ? props.theme.primary : '#FFF')};
  text-decoration: none;
`;

const ListItemImageStyled = styled.img`
  width: 2.5rem;
`;

const ListItemTextStyle = styled.div`
  color: inherit;
`;

const ListItemDescriptionStyle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.foregroundMuted};
`;
