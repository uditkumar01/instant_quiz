import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardDataType } from "./CardSm.types";
import "./CardSm.css";
import { FaPlayCircle, FaTrophy, IoShareSocial } from "react-icons/all";
import {
    Button,
    CardActions,
    Chip,
    IconButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { ReactNode, useState } from "react";
import { ListOptionsType } from "./CardSm.types";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const ITEM_HEIGHT = 48;

export default function LongMenu({
    icon,
    options,
}: {
    icon: ReactNode;
    options: ListOptionsType[];
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                {icon}
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                {options.map(({ name, onClick }) => (
                    <MenuItem
                        key={name}
                        onClick={() => {
                            handleClose();
                            if (onClick) {
                                onClick();
                            }
                        }}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export function CardSm({
    _id,
    title,
    content,
    image,
    addButton,
}: CardDataType) {
    const classes = useStyles();
    const getImg = () => {
        return `https://source.unsplash.com/1600x900/?${title
            .toLowerCase()
            .split("&")
            .join(",")}`;
    };

    return (
        <Card className={`card-sm ${classes.root}`}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt=""
                    height="160"
                    image={image ? image : getImg()}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {title}
                    </Typography>
                    {content ? (
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {content}
                        </Typography>
                    ) : (
                        ""
                    )}
                </CardContent>
                {addButton ? (
                    <CardActions disableSpacing>
                        <NavLink to={`quiz/${_id}`}>
                            <Button
                                aria-label="add to favorites"
                                className={`my-play-btn`}
                            >
                                <Chip
                                    icon={
                                        <FaPlayCircle
                                            style={{ fontSize: "1.5rem" }}
                                        />
                                    }
                                    label="Play Quiz"
                                    clickable
                                    color="primary"
                                    variant="outlined"
                                />
                            </Button>
                        </NavLink>
                        <div>
                            <IconButton aria-label="share">
                                <LongMenu
                                    icon={<IoShareSocial />}
                                    options={[
                                        {
                                            name: "Copy to Share",
                                            onClick: () => {
                                                navigator.clipboard.writeText(
                                                    `https://instantquiz.netlify.app/quiz/${_id}`
                                                );
                                            },
                                        },
                                    ]}
                                />
                            </IconButton>
                            <IconButton aria-label="leaderboard">
                                <FaTrophy />
                            </IconButton>
                        </div>
                    </CardActions>
                ) : (
                    ""
                )}
            </CardActionArea>
        </Card>
    );
}
