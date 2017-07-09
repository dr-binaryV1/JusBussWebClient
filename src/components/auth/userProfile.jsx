import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class UserProfile extends Component {
    constructor(props){
        super(props);

        this.state = ({
            file: '',
            imagePreviewUrl: ''
        });
    }

    _handleSubmit(e){
        e.preventDefault();
        console.log('handle uoloading...', this.state.file);
    }

    _handleImageChange(e){
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    render(){
        const { session } = this.props;
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if(imagePreviewUrl) {
            $imagePreview = (<img className="profile-picture" src={ imagePreviewUrl } />);
        } else {
            $imagePreview = (<img className="profile-picture" src="/../src/static/images/noImage.jpg" alt="" />)
        }
        return(
            <div className="profileContainer">
                <div className="basic-info">
                    <div className="user-photo left">
                        { $imagePreview }

                        <form onSubmit={(e) => this._handleSubmit(e)}>
                            <input type="file" onChange={(e) => this._handleImageChange(e)} />
                            <button type="submit" onClick={(e) => this._handleSubmit(e)}>upload</button>
                        </form>
                        <button>edit profile</button>
                    </div>

                    <div className="user-info left">
                        <h4>{ `${session.user.first_name} ${session.user.last_name} (${session.user.username})` }</h4>
                        <hr />
                        <p>Email: { session.user.email } </p>
                        <p>Phone: { session.user.phone } </p>
                        <br />
                    </div>
                </div>
                <hr />

                <div className="user-business">
                    <h4>Business</h4>
                    <p><i>No business added yet.</i></p>
                </div>
                <hr />

                <div className="user-reviews">
                    <h4>Reviews</h4>
                    <p><i>No reviews posted yet.</i></p>
                </div>
                 <hr />

                <div className="user-order">
                    <h4>Orders</h4>
                    <p><i>No order made yet.</i></p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { session: state.session }
}

export default connect(mapStateToProps, { })(UserProfile);
