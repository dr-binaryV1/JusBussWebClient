import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { postImages } from '../../actions';


// TODO add Field component to pass values over the network using axios
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
    }

    _handleImageChange(e){
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        //this.props.postImages(file);

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
            <div className="Container animated fadeIn">
                <div className="basic-info">
                    <div className="user-photo left">
                        { $imagePreview }

                        <form method="post"
                            action="http://jusbuss.herokuapp.com/profilepicture/upload"
                            onSubmit={(e) => this._handleSubmit(e)}
                            encType="multipart/form-data">
                                <input type="file" name="profilePic" onChange={(e) => this._handleImageChange(e)} />
                                <button className="btn-sm btn-primary btn left" type="submit">upload</button>
                        </form>
                        <button className="btn btn-success btn-sm left">edit profile</button>
                        <Link className="btn btn-danger btn-sm left" to="/signout">Sign Out</Link>
                    </div>

                    <div className="user-info left">
                        <h4>{ `${session.user.first_name} ${session.user.last_name} (${session.user.username})` }</h4>
                        <hr className="line-brightPink-left" />
                        <p>Email: { session.user.email } </p>
                        <p>Phone: { session.user.phone } </p>
                        <br />
                    </div>
                </div>
                <hr />
                <br />
                <div className="user-appointments">
                    <h4>Appointments</h4>
                    <p><i>No appointments made yet.</i></p>
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

export default connect(mapStateToProps, { postImages })(UserProfile);
