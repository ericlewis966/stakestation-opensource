import { Box, Grid, Container, Typography, Stack } from '@material-ui/core'
import CardButton from './CardButton';

export default function Pagination() {
    return (
        <Stack direction="row" sx={{p: 5, justifyContent: 'center'}}>
            <CardButton style={{borderRadius: 0, fontSize: 20}}>Preview</CardButton>
            <CardButton style={{borderRadius: 0, fontSize: 20}}>1</CardButton>
            <CardButton style={{borderRadius: 0, fontSize: 20}}>Next</CardButton>
        </Stack>
    )
}