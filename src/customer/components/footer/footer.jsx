import React from 'react';
import { Grid, Typography, Button, Box, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', mt: 10 }}>
      <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto', px: 4, pt: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Company</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>About</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Blog</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Press</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Jobs</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Partners</MuiLink>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Solutions</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Marketing</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Analytics</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Commerce</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Insights</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Support</MuiLink>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Documentation</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Guides</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>API Status</MuiLink>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Legal</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</MuiLink>
            <MuiLink href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</MuiLink>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ bgcolor: '#111', py: 2, mt: 4 }}>
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
          © 2026 Zosh. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
