import React from 'react';
import {Modal, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class SubmitModal extends React.PureComponent {
	render() {
		return (
			<Modal open={this.props.open}>
				<Modal.Content>
					<Modal.Description>
						<p>You logged in!</p>
					</Modal.Description>
					<Button color='green' style={{marginLeft: '90%'}}onClick={this.props.closer}>Done</Button>
				</Modal.Content>
			</Modal>
		);
	}
}

export default SubmitModal;