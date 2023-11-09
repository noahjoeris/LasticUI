import React, { useEffect, useState } from 'react';
import { useSubstrateState } from '../substrate-lib';

function QueryPalletVersion() {
    const { api } = useSubstrateState();
    const [palletVersion, setPalletVersion] = useState(null);

    // Hook to regularly fetch saleInfo data
    useEffect(() => {
      const fetch = async () => {
        if (api && api.query && api.query.broker && api.query.broker.palletVersion) {
          const result = await api.query.broker.palletVersion();
          setPalletVersion(result.toString());
        }
      };
      
      fetch();
      const intervalId = setInterval(fetch, 5000);
  
      return () => clearInterval(intervalId);
    }, [api]);
  
  
    return (
      <div>
        <h3>Pallet Version :</h3>
        <div>{palletVersion}</div>
      </div>
    );
}

export default QueryPalletVersion;
