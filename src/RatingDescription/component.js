import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import Desc from '@material-ui/icons/Description';

import Tooltip from '@material-ui/core/Tooltip';
import UserGroups from '@material-ui/icons/SupervisedUserCircle';
import Example from '@material-ui/icons/Highlight';
import Resources from '@material-ui/icons/Bookmarks';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  descriptionPart: {
    maxWidth: '66%'
  }
};

const Description = props => {
  const { classes, desc, relevantTo, examples, resources } = props;
  return (
    <>
      {/*
		<div className={classes.descriptionPart}>

			<Typography variant="h6" gutterBottom>Description</Typography>
			<Typography>
				<div className="desc"><Tooltip title="Description of this capacity" enterDelay={200} leaveDelay={200}><Desc /></Tooltip> {desc}</div>
				<br />
				<div className="relevant"><Tooltip title="Who is this relevant to" enterDelay={200} leaveDelay={200}><UserGroups /></Tooltip> {relevantTo}</div>
			</Typography>
		</div>
		
		*/}
      <div className={classes.descriptionPart}>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        {desc && desc.length > 0 && (
          <Typography paragraph>
            <Tooltip
              title="Description of this capacity"
              enterDelay={200}
              leaveDelay={200}
            >
              <Desc />
            </Tooltip>{' '}
            {desc}
          </Typography>
        )}
        {relevantTo && relevantTo.length > 0 && (
          <Typography paragraph>
            <Tooltip
              title="Who is this relevant to"
              enterDelay={200}
              leaveDelay={200}
            >
              <UserGroups />
            </Tooltip>{' '}
            {relevantTo}
          </Typography>
        )}
        {examples && examples.length > 0 && (
          <Typography paragraph>
            <Tooltip title="Examples" enterDelay={200} leaveDelay={200}>
              <Example />
            </Tooltip>{' '}
            {examples}
          </Typography>
        )}
        {resources && resources.length > 0 && (
          <Typography paragraph>
            <Tooltip title="Resources" enterDelay={200} leaveDelay={200}>
              <Resources />
            </Tooltip>{' '}
            {resources}
          </Typography>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(Description);
