import React, { Component } from 'react';

export const mapNavStateToProps = (SomeComponent) => {
    return class extends Component {
        render() {
            const { navigation: { state: { params } } } = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}