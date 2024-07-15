import React from 'react';
import styled from 'styled-components';

function Participants(props) {
	return (
		<>
			<div>
				<strong>Participants</strong>
			</div>
			<ParticipantInfo>
				{props.users.map((user) => (
					<Box key={user.id}>{user.name}</Box>
				))}
			</ParticipantInfo>
			<div
				style={{
					height: '1px',
					backgroundColor: 'pink',
					margin: '12px 0',
				}}
			></div>
		</>
	);
}

const ParticipantInfo = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 6px;
`;

const Box = styled.div`
	box-sizing: border-box;
	padding: 3px 20px;
	border: 1.5px solid magenta;
	text-align: center;
	font-weight: 500;
	margin-right: 5px;
	margin-bottom: 5px;
	border-radius: 10px;
	font-size: 0.7em;
`;

export default Participants;
