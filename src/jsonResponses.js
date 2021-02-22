const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json'});
    response.write(JSON.stringify(object));
    response.end();
};

const respond = (request, response, status, content) => {
    response.writeHead(status, { 'Content-Type': 'text/xml'});
    response.write(content);
    response.end();
};

const success = (request, response, acceptedTerms) => {
    const responseJSON = {
        message: 'This is a successful response',
    };
    
    if(acceptedTerms[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;
        
        return respond(request, response, 200, responseXML);
    }
    
    return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, acceptedTerms, params) => {
    const responseJSON = {
        message: 'This request has the required parameters',
    };
    
    if(!params.valid || params.valid !== 'true')
    {
        responseJSON.message = 'Missing valid query parameter set equal to true';
        responseJSON.id = 'badRequest';
        
        if(acceptedTerms[0] === 'text/xml')
        {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
            responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
            responseXML = `${responseXML} </response>`;
        
            return respond(request, response, 400, responseXML);
        }
        return respondJSON(request, response, 400, responseJSON);
    }
    
    if(acceptedTerms[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;
        
        return respond(request, response, 200, responseXML);
    }
    
    return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, acceptedTerms, params) => {
    const responseJSON = {
        message: 'This request has the required parameters',
    };
    
    if(!params.loggedIn || params.loggedIn !== 'true')
    {
        responseJSON.message = 'Missing valid query parameter set equal to true';
        responseJSON.id = 'unauthorized';
        
        if(acceptedTerms[0] === 'text/xml')
        {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
            responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
            responseXML = `${responseXML} </response>`;
        
            return respond(request, response, 401, responseXML);
        }
        
        return respondJSON(request, response, 401, responseJSON);
    }
    
    if(acceptedTerms[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;
        
        return respond(request, response, 200, responseXML);
    }
    
    return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, acceptedTerms) => {
    const responseJSON = {
        message: 'You do not have access to this content',
        id: 'forbidden',
    };
    
    if(acceptedTerms[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        
        return respond(request, response, 200, responseXML);
    }
    
    return respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, acceptedTerms) => {
    const responseJSON = {
        message: 'Internal Server Error. Something went wrong',
        id: 'internalError',
    };
    
    if(acceptedTerms[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        
        return respond(request, response, 200, responseXML);
    }
    
    return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, acceptedTerms) => {
    const responseJSON = {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content',
        id: "notImplemented",
    };
    
    if(acceptedTerms[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
        responseXML = `${responseXML} </response>`;
        
        return respond(request, response, 200, responseXML);
    }
    
    return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound'
    };
    
    return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
    success,
    badRequest,
    notFound,
    forbidden,
    unauthorized,
    internal,
    notImplemented,
};