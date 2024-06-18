import logging
import os


class CustomLogger(logging.Logger):
    def error(self, msg, *args, **kwargs):
        """
        Log 'msg % args' with severity 'ERROR', including traceback information.
        """
        kwargs.setdefault('exc_info', True)
        super(CustomLogger, self).error(msg, *args, **kwargs)


logging.setLoggerClass(CustomLogger)

ENV = os.getenv('ENV')

if ENV == 'dev':
    logLevel = logging.DEBUG
else:
    logLevel = logging.INFO

# Enable logging with a specified format and a base logging level
logging.basicConfig(format='%(levelname)-4s:  %(filename)12.12s:%(lineno)3d - %(message)s',
                    level=logLevel)

log = logging.getLogger(__name__)
