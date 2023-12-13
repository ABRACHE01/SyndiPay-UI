import React from 'react'

const Spinner = () => {
    return (
        <>
          <div className="absolute bg-slate-400 bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
            <div className="flex items-center">
              <Spinner size="lg" />
            </div>
          </div>
        </>
      );
    }

export default Spinner