import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple, grey } from "@material-ui/core/colors";
import { auth } from "../../Firebase/Firebase";

export default function LetterAvatars({ character }: { character: string }) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: "flex",
                "& > *": {
                    margin: theme.spacing(1),
                },
            },
            orange: {
                color: theme.palette.getContrastText(deepOrange[500]),
                backgroundColor: deepOrange[500],
            },
            purple: {
                color: theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
            },
            grey: {
                color: theme.palette.getContrastText(grey[500]),
                backgroundColor: grey[500],
            },
            small: {
                width: theme.spacing(4),
                height: theme.spacing(4),
                fontSize: "1rem",
            },
        })
    );
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar className={`${classes.small} ${classes.grey}`}>
                {character}
            </Avatar>
        </div>
    );
}

export function ImageAvatars({ src }: { src?: string | null }) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: "flex",
                "& > *": {
                    margin: theme.spacing(1),
                },
            },
            small: {
                width: theme.spacing(4),
                height: theme.spacing(4),
                fontSize: "1rem",
            },
        })
    );
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Avatar
                className={`${classes.small}`}
                alt={""}
                src={src ? src : undefined}
            />
        </div>
    );
}
